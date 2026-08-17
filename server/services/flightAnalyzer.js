import { timeStringToMinutes } from './naverFlightService.js';

export function filterAndAnalyzeFlights(rawFlights, filters = {}) {
  const {
    depTimeStart = '00:00',
    depTimeEnd = '23:59',
    retTimeStart = '00:00',
    retTimeEnd = '23:59',
    selectedAirlines = [],
    airlineCategory = 'ALL',
    directOnly = false,
    maxPrice = null,
    minPrice = null,
    baggageOnly = false,
    sortBy = 'price_asc', // 기본값을 최저가순으로 설정하여 기간 내 가장 싼 비행기가 맨 위에 오도록
    selectedDaysOfWeek = [], // 요일 필터 (예: ['금', '토', '일'])
  } = filters;

  const depStartMins = timeStringToMinutes(depTimeStart);
  const depEndMins = timeStringToMinutes(depTimeEnd);
  const retStartMins = timeStringToMinutes(retTimeStart);
  const retEndMins = timeStringToMinutes(retTimeEnd);

  // 1. 전체 검색 결과 내 항공사 통계
  const airlineStatsMap = {};
  rawFlights.forEach(f => {
    const code = f.airline.code;
    if (!airlineStatsMap[code]) {
      airlineStatsMap[code] = {
        airline: f.airline,
        count: 0,
        minPrice: f.pricing.pricePerAdult,
        hasDirect: f.isDirect,
      };
    } else {
      airlineStatsMap[code].count += 1;
      if (f.pricing.pricePerAdult < airlineStatsMap[code].minPrice) {
        airlineStatsMap[code].minPrice = f.pricing.pricePerAdult;
      }
    }
  });

  const availableAirlines = Object.values(airlineStatsMap).sort((a, b) => a.minPrice - b.minPrice);

  // 2. 사용자가 지정한 시간대 및 조건 필터 적용
  const filteredFlights = rawFlights.filter(flight => {
    // 가는 편 출발 시간 (예: 09:00 ~ 11:00)
    const outDepMins = flight.outbound.departureMinutes;
    if (outDepMins < depStartMins || outDepMins > depEndMins) {
      return false;
    }

    // 오는 편 출발 시간 (예: 18:00 ~ 21:00)
    if (flight.inbound) {
      const inDepMins = flight.inbound.departureMinutes;
      if (inDepMins < retStartMins || inDepMins > retEndMins) {
        return false;
      }
    }

    // 요일 필터
    if (selectedDaysOfWeek && selectedDaysOfWeek.length > 0) {
      if (!selectedDaysOfWeek.includes(flight.outbound.departureDayOfWeek)) {
        return false;
      }
    }

    // 직항 전용
    if (directOnly && !flight.isDirect) {
      return false;
    }

    // 항공사 선택
    if (selectedAirlines && selectedAirlines.length > 0) {
      if (!selectedAirlines.includes(flight.airline.code)) {
        return false;
      }
    }

    // 항공사 카테고리
    if (airlineCategory && airlineCategory !== 'ALL') {
      if (airlineCategory === 'FSC' && !['FSC', 'Foreign_FSC'].includes(flight.airline.category)) {
        return false;
      }
      if (airlineCategory === 'LCC' && !['LCC', 'Foreign_LCC'].includes(flight.airline.category)) {
        return false;
      }
      if (airlineCategory === 'FOREIGN' && !flight.airline.category.startsWith('Foreign')) {
        return false;
      }
    }

    // 가격 범위
    if (maxPrice && flight.pricing.pricePerAdult > maxPrice) {
      return false;
    }
    if (minPrice && flight.pricing.pricePerAdult < minPrice) {
      return false;
    }

    // 수하물 포함
    if (baggageOnly && !flight.baggage.included) {
      return false;
    }

    return true;
  });

  // 3. 점수 계산
  const minPriceInFiltered = filteredFlights.length > 0
    ? Math.min(...filteredFlights.map(f => f.pricing.pricePerAdult))
    : 1;
  const maxPriceInFiltered = filteredFlights.length > 0
    ? Math.max(...filteredFlights.map(f => f.pricing.pricePerAdult))
    : 1;
  const minDuration = filteredFlights.length > 0
    ? Math.min(...filteredFlights.map(f => f.totalDurationMinutes))
    : 1;

  const scoredFlights = filteredFlights.map(f => {
    const priceRange = (maxPriceInFiltered - minPriceInFiltered) || 1;
    const priceScore = 100 - ((f.pricing.pricePerAdult - minPriceInFiltered) / priceRange) * 50;
    const durationScore = Math.max(50, 100 - (f.totalDurationMinutes - minDuration) * 0.2);

    let timeScore = 70;
    if (f.outbound.isGoldenTime) timeScore += 15;
    if (f.inbound && f.inbound.isGoldenTime) timeScore += 15;

    let featureScore = 70;
    if (f.isDirect) featureScore += 20;
    if (f.baggage.included) featureScore += 10;

    const totalScore = Math.round(
      priceScore * 0.45 +
      durationScore * 0.25 +
      timeScore * 0.15 +
      featureScore * 0.15
    );

    return {
      ...f,
      score: Math.min(99, Math.max(60, totalScore)),
      isCheapest: f.pricing.pricePerAdult === minPriceInFiltered,
    };
  });

  // 4. 기간 내 스마트 추천 3대 픽
  let bestPricePick = null;
  let bestSchedulePick = null;
  let bestValuePick = null;

  if (scoredFlights.length > 0) {
    bestPricePick = [...scoredFlights].sort((a, b) => a.pricing.pricePerAdult - b.pricing.pricePerAdult)[0];

    const directFlights = scoredFlights.filter(f => f.isDirect);
    const goldenDirect = directFlights.filter(f => f.outbound.isGoldenTime);
    if (goldenDirect.length > 0) {
      bestSchedulePick = goldenDirect.sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes)[0];
    } else if (directFlights.length > 0) {
      bestSchedulePick = directFlights.sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes)[0];
    } else {
      bestSchedulePick = [...scoredFlights].sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes)[0];
    }

    bestValuePick = [...scoredFlights].sort((a, b) => b.score - a.score)[0];
  }

  // 5. 정렬 적용
  const sortedFlights = [...scoredFlights].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.pricing.pricePerAdult - b.pricing.pricePerAdult;
      case 'price_desc':
        return b.pricing.pricePerAdult - a.pricing.pricePerAdult;
      case 'date_asc':
        return a.departureDate.localeCompare(b.departureDate);
      case 'duration_asc':
        return a.totalDurationMinutes - b.totalDurationMinutes;
      case 'dep_time_asc':
        return a.outbound.departureMinutes - b.outbound.departureMinutes;
      case 'recommend':
      default:
        return b.score - a.score;
    }
  });

  const prices = filteredFlights.map(f => f.pricing.pricePerAdult);
  const minPriceFound = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceFound = prices.length > 0 ? Math.max(...prices) : 0;
  const avgPriceFound = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  return {
    totalSearched: rawFlights.length,
    filteredCount: sortedFlights.length,
    availableAirlines: availableAirlines,
    priceSummary: {
      min: minPriceFound,
      max: maxPriceFound,
      avg: avgPriceFound,
      formattedMin: `${minPriceFound.toLocaleString('ko-KR')}원`,
      formattedMax: `${maxPriceFound.toLocaleString('ko-KR')}원`,
      formattedAvg: `${avgPriceFound.toLocaleString('ko-KR')}원`,
    },
    recommendations: {
      bestPrice: bestPricePick,
      bestSchedule: bestSchedulePick,
      bestValue: bestValuePick,
    },
    flights: sortedFlights,
  };
}
