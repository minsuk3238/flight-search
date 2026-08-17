import { AIRPORTS } from '../data/airports.js';
import { AIRLINES } from '../data/airlines.js';

// 네이버 항공권 바로가기 딥링크 생성기
export function generateNaverFlightUrl({
  tripType = 'round',
  origin = 'ICN',
  destination = 'NRT',
  departureDate, // 'YYYY-MM-DD' or 'YYYYMMDD'
  returnDate,    // 'YYYY-MM-DD' or 'YYYYMMDD'
  adults = 1,
  isDirect = false,
  fareType = 'Y'
}) {
  const cleanDepDate = departureDate ? departureDate.replace(/-/g, '') : '';
  const cleanRetDate = returnDate ? returnDate.replace(/-/g, '') : '';

  if (tripType === 'round' && cleanRetDate) {
    const directParam = isDirect ? '&isDirect=true' : '';
    return `https://flight.naver.com/flights/international/${origin}-${destination}-${cleanDepDate}/${destination}-${origin}-${cleanRetDate}?adult=${adults}&child=0&infant=0&fareType=${fareType}${directParam}`;
  } else {
    const directParam = isDirect ? '&isDirect=true' : '';
    return `https://flight.naver.com/flights/international/${origin}-${destination}-${cleanDepDate}?adult=${adults}&child=0&infant=0&fareType=${fareType}${directParam}`;
  }
}

// 노선 기본 정보
function getRouteBaseInfo(origin, destination) {
  const routeMap = {
    'NRT': { duration: 155, basePrice: 150000, distanceKm: 1260 },
    'HND': { duration: 140, basePrice: 190000, distanceKm: 1200 },
    'KIX': { duration: 105, basePrice: 130000, distanceKm: 860 },
    'FUK': { duration: 80,  basePrice: 100000, distanceKm: 540 },
    'CTS': { duration: 170, basePrice: 190000, distanceKm: 1430 },
    'OKA': { duration: 135, basePrice: 160000, distanceKm: 1250 },
    'BKK': { duration: 340, basePrice: 190000, distanceKm: 3700 },
    'DMK': { duration: 345, basePrice: 170000, distanceKm: 3700 },
    'DAD': { duration: 275, basePrice: 160000, distanceKm: 2980 },
    'CXR': { duration: 295, basePrice: 170000, distanceKm: 3200 },
    'SGN': { duration: 335, basePrice: 180000, distanceKm: 3560 },
    'HAN': { duration: 280, basePrice: 160000, distanceKm: 2700 },
    'PQC': { duration: 340, basePrice: 200000, distanceKm: 3600 },
    'SIN': { duration: 380, basePrice: 240000, distanceKm: 4650 },
    'TPE': { duration: 165, basePrice: 145000, distanceKm: 1460 },
    'HKG': { duration: 220, basePrice: 160000, distanceKm: 2070 },
    'DPS': { duration: 420, basePrice: 320000, distanceKm: 5280 },
    'CEB': { duration: 265, basePrice: 155000, distanceKm: 3000 },
    'GUM': { duration: 270, basePrice: 220000, distanceKm: 3200 },
    'HNL': { duration: 480, basePrice: 550000, distanceKm: 7300 },
    'LAX': { duration: 660, basePrice: 650000, distanceKm: 9600 },
    'JFK': { duration: 840, basePrice: 850000, distanceKm: 11000 },
    'SFO': { duration: 630, basePrice: 660000, distanceKm: 9000 },
    'SYD': { duration: 620, basePrice: 580000, distanceKm: 8300 },
    'CDG': { duration: 780, basePrice: 720000, distanceKm: 8900 },
    'LHR': { duration: 790, basePrice: 750000, distanceKm: 8850 },
    'FCO': { duration: 750, basePrice: 690000, distanceKm: 8970 },
    'BCN': { duration: 780, basePrice: 710000, distanceKm: 9600 },
  };

  return routeMap[destination] || { duration: 240, basePrice: 200000, distanceKm: 2500 };
}

// 요일 및 성수기 계수
function getDateMultiplier(dateStr) {
  if (!dateStr) return 1.0;
  const date = new Date(dateStr);
  const day = date.getDay();
  const month = date.getMonth() + 1;

  let multiplier = 1.0;
  if (day === 5) multiplier += 0.22; // 금요일
  else if (day === 6) multiplier += 0.28; // 토요일
  else if (day === 0) multiplier += 0.15; // 일요일
  else if (day === 2 || day === 3) multiplier -= 0.10; // 화, 수 최저가

  if ([7, 8, 12, 1, 2].includes(month)) {
    multiplier += 0.18;
  }
  return multiplier;
}

// 분 -> "HH:MM"
function minutesToTimeString(minutes) {
  const m = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = String(Math.floor(m / 60)).padStart(2, '0');
  const mm = String(m % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

// "HH:MM" -> 분
export function timeStringToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hh, mm] = timeStr.split(':').map(Number);
  return (hh || 0) * 60 + (mm || 0);
}

function generateFlightNumber(airlineCode) {
  const num = Math.floor(100 + Math.random() * 899);
  return `${airlineCode}${num}`;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

// 1. 단일 날짜 항공편 생성기
export function generateSingleDayFlights({
  tripType = 'round',
  origin = 'ICN',
  destination = 'NRT',
  departureDate,
  returnDate,
  adults = 1,
  directOnly = false,
}) {
  const originAirport = AIRPORTS.find(a => a.code === origin) || { code: origin, name: origin, city: origin };
  const destAirport = AIRPORTS.find(a => a.code === destination) || { code: destination, name: destination, city: destination };
  const routeInfo = getRouteBaseInfo(origin, destination);

  const depDateObj = new Date(departureDate);
  const depDayName = dayNames[depDateObj.getDay()];
  const depFormatted = `${depDateObj.getMonth() + 1}.${depDateObj.getDate()}(${depDayName})`;

  let retFormatted = '';
  let retDayName = '';
  let stayNights = 0;
  if (tripType === 'round' && returnDate) {
    const retDateObj = new Date(returnDate);
    retDayName = dayNames[retDateObj.getDay()];
    retFormatted = `${retDateObj.getMonth() + 1}.${retDateObj.getDate()}(${retDayName})`;
    const diffTime = retDateObj.getTime() - depDateObj.getTime();
    stayNights = Math.max(1, Math.round(diffTime / (1000 * 3600 * 24)));
  }

  const depMultiplier = getDateMultiplier(departureDate);

  let applicableAirlines = AIRLINES;
  if (['NRT', 'HND', 'KIX', 'FUK', 'CTS', 'OKA'].includes(destination)) {
    applicableAirlines = AIRLINES.filter(a => ['FSC', 'LCC'].includes(a.category) || ['MM', 'JL', 'NH'].includes(a.code));
  } else if (['BKK', 'DMK', 'DAD', 'CXR', 'SGN', 'HAN', 'PQC', 'SIN', 'TPE', 'HKG', 'CEB'].includes(destination)) {
    applicableAirlines = AIRLINES.filter(a => ['FSC', 'LCC'].includes(a.category) || ['VJ', 'VN', 'TG', 'SQ', 'CX'].includes(a.code));
  } else if (['CDG', 'LHR', 'FCO', 'BCN', 'FRA', 'IST'].includes(destination)) {
    applicableAirlines = AIRLINES.filter(a => ['KE', 'OZ', 'AF', 'LH', 'TK', 'EK', 'QR'].includes(a.code) || a.category.includes('FSC') || a.code === 'TW');
  } else if (['JFK', 'LAX', 'SFO', 'HNL', 'GUM'].includes(destination)) {
    applicableAirlines = AIRLINES.filter(a => ['KE', 'OZ', 'DL', 'UA', 'AA', '7C', 'LJ', 'TW'].includes(a.code));
  }

  // 촘촘한 시간대별 스케줄 슬롯 (06:00 ~ 23:30 사이 다양하게 배치)
  const outboundTimeSlots = [
    { dep: '06:30', isGolden: false, slotName: '새벽' },
    { dep: '07:30', isGolden: false, slotName: '이른 아침' },
    { dep: '08:45', isGolden: true,  slotName: '아침' },
    { dep: '09:20', isGolden: true,  slotName: '오전 9시' },
    { dep: '10:00', isGolden: true,  slotName: '오전 10시' },
    { dep: '10:45', isGolden: true,  slotName: '오전 10시반' },
    { dep: '11:30', isGolden: true,  slotName: '오전' },
    { dep: '12:40', isGolden: false, slotName: '점심' },
    { dep: '14:15', isGolden: false, slotName: '오후' },
    { dep: '16:00', isGolden: false, slotName: '오후' },
    { dep: '17:30', isGolden: false, slotName: '늦은 오후' },
    { dep: '18:15', isGolden: true,  slotName: '저녁 6시' },
    { dep: '19:00', isGolden: true,  slotName: '저녁 7시' },
    { dep: '20:10', isGolden: true,  slotName: '저녁 8시' },
    { dep: '21:30', isGolden: false, slotName: '야간' },
    { dep: '22:45', isGolden: false, slotName: '심야' },
  ];

  const inboundTimeSlots = [
    { dep: '07:00', isGolden: false, slotName: '이른 아침' },
    { dep: '08:30', isGolden: false, slotName: '아침' },
    { dep: '10:15', isGolden: false, slotName: '오전' },
    { dep: '12:00', isGolden: false, slotName: '낮' },
    { dep: '14:30', isGolden: true,  slotName: '오후' },
    { dep: '16:15', isGolden: true,  slotName: '늦은 오후' },
    { dep: '18:00', isGolden: true,  slotName: '저녁 6시' },
    { dep: '18:45', isGolden: true,  slotName: '저녁 6시반' },
    { dep: '19:30', isGolden: true,  slotName: '저녁 7시반' },
    { dep: '20:20', isGolden: true,  slotName: '저녁 8시' },
    { dep: '21:10', isGolden: true,  slotName: '밤 9시' },
    { dep: '22:30', isGolden: false, slotName: '심야' },
  ];

  const flights = [];

  applicableAirlines.forEach((airline, airlineIdx) => {
    let airlinePriceMultiplier = 1.0;
    if (airline.category === 'FSC' || airline.category === 'Foreign_FSC') {
      airlinePriceMultiplier = 1.55;
    } else if (airline.category === 'LCC') {
      airlinePriceMultiplier = 1.0;
      if (['RF', 'MM', 'VJ'].includes(airline.code)) {
        airlinePriceMultiplier = 0.88;
      }
    }

    // 항공사마다 3~4개의 운항편 조합
    const flightCount = (airlineIdx % 2) + 3;
    for (let i = 0; i < flightCount; i++) {
      const outSlotIndex = (airlineIdx * 3 + i * 4) % outboundTimeSlots.length;
      const outSlot = outboundTimeSlots[outSlotIndex];
      const outDepMins = timeStringToMinutes(outSlot.dep);
      const outArrMins = outDepMins + routeInfo.duration;
      const outFlightNo = generateFlightNumber(airline.code);

      let inFlight = null;
      let totalDuration = routeInfo.duration;

      if (tripType === 'round' && returnDate) {
        const inSlotIndex = (airlineIdx * 4 + i * 3 + 2) % inboundTimeSlots.length;
        const inSlot = inboundTimeSlots[inSlotIndex];
        const inDepMins = timeStringToMinutes(inSlot.dep);
        const inArrMins = inDepMins + routeInfo.duration;
        const inFlightNo = generateFlightNumber(airline.code);

        inFlight = {
          flightNumber: inFlightNo,
          airline: airline,
          departureDate: returnDate,
          departureDateFormatted: retFormatted,
          departureDayOfWeek: retDayName,
          departureTime: inSlot.dep,
          departureMinutes: inDepMins,
          arrivalTime: minutesToTimeString(inArrMins),
          arrivalMinutes: inArrMins,
          origin: destAirport,
          destination: originAirport,
          durationMinutes: routeInfo.duration,
          durationFormatted: `${Math.floor(routeInfo.duration / 60)}시간 ${routeInfo.duration % 60}분`,
          isDirect: true,
          stops: 0,
          isGoldenTime: inSlot.isGolden,
          slotName: inSlot.slotName,
        };

        totalDuration += routeInfo.duration;
      }

      let timePremium = outSlot.isGolden ? 1.12 : 0.95;
      if (inFlight && inFlight.isGoldenTime) {
        timePremium *= 1.08;
      }

      const tripFactor = tripType === 'round' ? 1.85 : 1.0;
      const baseFare = Math.round((routeInfo.basePrice * depMultiplier * airlinePriceMultiplier * timePremium * tripFactor) / 1000) * 1000;
      const taxes = Math.round((baseFare * 0.18) / 100) * 100;
      const fuelSurcharge = Math.round((baseFare * 0.12) / 100) * 100;
      const totalPricePerAdult = baseFare + taxes + fuelSurcharge;
      const totalAmount = totalPricePerAdult * adults;
      const remainingSeats = Math.floor(Math.random() * 8) + 2;

      const scheduleLabel = tripType === 'round'
        ? `${depFormatted} ~ ${retFormatted} (${stayNights}박 ${stayNights + 1}일)`
        : `${depFormatted} (편도)`;

      flights.push({
        id: `flight-${airline.code}-${outFlightNo}-${departureDate}-${returnDate || ''}-${i}`,
        airline: airline,
        tripType: tripType,
        isDirect: true,
        stops: 0,
        departureDate: departureDate,
        returnDate: returnDate,
        departureDateFormatted: depFormatted,
        returnDateFormatted: retFormatted,
        stayNights: stayNights,
        stayDaysFormatted: stayNights > 0 ? `${stayNights}박 ${stayNights + 1}일` : '편도',
        scheduleLabel: scheduleLabel,
        outbound: {
          flightNumber: outFlightNo,
          airline: airline,
          departureDate: departureDate,
          departureDateFormatted: depFormatted,
          departureDayOfWeek: depDayName,
          departureTime: outSlot.dep,
          departureMinutes: outDepMins,
          arrivalTime: minutesToTimeString(outArrMins),
          arrivalMinutes: outArrMins,
          origin: originAirport,
          destination: destAirport,
          durationMinutes: routeInfo.duration,
          durationFormatted: `${Math.floor(routeInfo.duration / 60)}시간 ${routeInfo.duration % 60}분`,
          isDirect: true,
          stops: 0,
          isGoldenTime: outSlot.isGolden,
          slotName: outSlot.slotName,
        },
        inbound: inFlight,
        totalDurationMinutes: totalDuration,
        totalDurationFormatted: `${Math.floor(totalDuration / 60)}시간 ${totalDuration % 60}분`,
        pricing: {
          baseFare: baseFare,
          taxes: taxes,
          fuelSurcharge: fuelSurcharge,
          pricePerAdult: totalPricePerAdult,
          totalAmount: totalAmount,
          currency: 'KRW',
          formattedPrice: `${totalPricePerAdult.toLocaleString('ko-KR')}원`,
          formattedTotalPrice: `${totalAmount.toLocaleString('ko-KR')}원`,
        },
        baggage: {
          included: airline.baggageIncluded,
          allowance: airline.baggageAllowance,
          cabinBaggage: '기내 수하물 10kg 무료',
        },
        remainingSeats: remainingSeats,
        naverUrl: generateNaverFlightUrl({
          tripType,
          origin,
          destination,
          departureDate,
          returnDate,
          adults,
          isDirect: true,
        }),
      });
    }
  });

  return flights;
}

// 2. 전체 유연 기간(Flexible Range) 다중 날짜 검색 엔진
export async function searchFlexibleRangeFlights({
  tripType = 'round',
  origin = 'ICN',
  destination = 'NRT',
  startDate, // 'YYYY-MM-DD'
  endDate,   // 'YYYY-MM-DD'
  stayDays = 3, // 머무는 일수 (예: 3일 = 3박4일)
  stayDaysMin = 3,
  stayDaysMax = 3,
  adults = 1,
  directOnly = false,
}) {
  const originAirport = AIRPORTS.find(a => a.code === origin) || { code: origin, name: origin, city: origin };
  const destAirport = AIRPORTS.find(a => a.code === destination) || { code: destination, name: destination, city: destination };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const allFlights = [];
  const currentDate = new Date(start);

  // 시작일부터 종료일까지 일자별로 순회하며 항공권 조합 생성
  while (currentDate <= end) {
    const depDateStr = currentDate.toISOString().split('T')[0];

    // 체류 일수 범위 순회
    const minDays = stayDaysMin || stayDays || 3;
    const maxDays = stayDaysMax || stayDays || 3;

    for (let stay = minDays; stay <= maxDays; stay++) {
      let retDateStr = null;
      if (tripType === 'round') {
        const retDate = new Date(currentDate);
        retDate.setDate(currentDate.getDate() + stay);
        retDateStr = retDate.toISOString().split('T')[0];
      }

      const dayFlights = generateSingleDayFlights({
        tripType,
        origin,
        destination,
        departureDate: depDateStr,
        returnDate: retDateStr,
        adults,
        directOnly,
      });

      allFlights.push(...dayFlights);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    origin: originAirport,
    destination: destAirport,
    startDate,
    endDate,
    tripType,
    adults,
    totalCount: allFlights.length,
    flights: allFlights,
  };
}

// 기존 단일 검색 하위 호환 래퍼
export async function searchFlights({
  tripType = 'round',
  origin = 'ICN',
  destination = 'NRT',
  departureDate,
  returnDate,
  adults = 1,
  directOnly = false,
}) {
  const originAirport = AIRPORTS.find(a => a.code === origin) || { code: origin, name: origin, city: origin };
  const destAirport = AIRPORTS.find(a => a.code === destination) || { code: destination, name: destination, city: destination };

  const flights = generateSingleDayFlights({
    tripType,
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    directOnly,
  });

  return {
    origin: originAirport,
    destination: destAirport,
    departureDate,
    returnDate,
    tripType,
    adults,
    totalCount: flights.length,
    flights: flights,
  };
}

// 기간 트렌드
export async function getPriceTrends({
  tripType = 'round',
  origin = 'ICN',
  destination = 'NRT',
  centerDepartureDate,
  stayDurationDays = 3,
}) {
  const routeInfo = getRouteBaseInfo(origin, destination);
  const baseCenterDate = new Date(centerDepartureDate || new Date());

  const trends = [];
  const daysRange = 6;

  for (let offset = -daysRange; offset <= daysRange; offset++) {
    const targetDepDate = new Date(baseCenterDate);
    targetDepDate.setDate(baseCenterDate.getDate() + offset);

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (targetDepDate < now) continue;

    const depDateStr = targetDepDate.toISOString().split('T')[0];
    const targetRetDate = new Date(targetDepDate);
    targetRetDate.setDate(targetDepDate.getDate() + stayDurationDays);
    const retDateStr = targetRetDate.toISOString().split('T')[0];

    const depMultiplier = getDateMultiplier(depDateStr);
    const tripFactor = tripType === 'round' ? 1.85 : 1.0;
    const estLowestPrice = Math.round((routeInfo.basePrice * depMultiplier * 0.92 * tripFactor * 1.3) / 1000) * 1000;

    const dayOfWeek = dayNames[targetDepDate.getDay()];
    const isWeekend = targetDepDate.getDay() === 0 || targetDepDate.getDay() === 6;
    const isCenter = offset === 0;

    trends.push({
      departureDate: depDateStr,
      returnDate: retDateStr,
      displayDate: `${targetDepDate.getMonth() + 1}.${targetDepDate.getDate()} (${dayOfWeek})`,
      dayOfWeek: dayOfWeek,
      isWeekend: isWeekend,
      isCenterDate: isCenter,
      lowestPrice: estLowestPrice,
      formattedPrice: `${estLowestPrice.toLocaleString('ko-KR')}원`,
      naverUrl: generateNaverFlightUrl({
        tripType,
        origin,
        destination,
        departureDate: depDateStr,
        returnDate: retDateStr,
        adults: 1,
        isDirect: false,
      })
    });
  }

  if (trends.length > 0) {
    const minPrice = Math.min(...trends.map(t => t.lowestPrice));
    trends.forEach(t => {
      t.isCheapestInPeriod = (t.lowestPrice === minPrice);
    });
  }

  return trends;
}
