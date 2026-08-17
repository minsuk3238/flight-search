// 클라이언트 사이드 독립 실행형 항공권 검색 & 분석 엔진 (GitHub Pages 등 정적 호스팅 완벽 지원)

export const AIRPORTS = [
  { code: 'ICN', name: '인천', englishName: 'Incheon', country: '대한민국', city: '서울/인천', type: 'domestic_hub', group: '국내' },
  { code: 'GMP', name: '김포', englishName: 'Gimpo', country: '대한민국', city: '서울/김포', type: 'domestic_hub', group: '국내' },
  { code: 'PUS', name: '김해(부산)', englishName: 'Gimhae (Busan)', country: '대한민국', city: '부산', type: 'domestic', group: '국내' },
  { code: 'CJU', name: '제주', englishName: 'Jeju', country: '대한민국', city: '제주', type: 'domestic', group: '국내' },
  { code: 'TAE', name: '대구', englishName: 'Daegu', country: '대한민국', city: '대구', type: 'domestic', group: '국내' },
  { code: 'CJJ', name: '청주', englishName: 'Cheongju', country: '대한민국', city: '청주', type: 'domestic', group: '국내' },

  { code: 'NRT', name: '나리타(도쿄)', englishName: 'Narita (Tokyo)', country: '일본', city: '도쿄', region: '동아시아', popular: true, group: '일본' },
  { code: 'HND', name: '하네다(도쿄)', englishName: 'Haneda (Tokyo)', country: '일본', city: '도쿄', region: '동아시아', popular: true, group: '일본' },
  { code: 'KIX', name: '간사이(오사카)', englishName: 'Kansai (Osaka)', country: '일본', city: '오사카', region: '동아시아', popular: true, group: '일본' },
  { code: 'FUK', name: '후쿠오카', englishName: 'Fukuoka', country: '일본', city: '후쿠오카', region: '동아시아', popular: true, group: '일본' },
  { code: 'CTS', name: '신치토세(삿포로)', englishName: 'New Chitose (Sapporo)', country: '일본', city: '삿포로', region: '동아시아', popular: true, group: '일본' },
  { code: 'OKA', name: '오키나와(나하)', englishName: 'Naha (Okinawa)', country: '일본', city: '오키나와', region: '동아시아', popular: true, group: '일본' },

  { code: 'BKK', name: '수완나품(방콕)', englishName: 'Suvarnabhumi (Bangkok)', country: '태국', city: '방콕', region: '동남아', popular: true, group: '동남아' },
  { code: 'DMK', name: '돈므앙(방콕)', englishName: 'Don Mueang (Bangkok)', country: '태국', city: '방콕', region: '동남아', group: '동남아' },
  { code: 'DAD', name: '다낭', englishName: 'Da Nang', country: '베트남', city: '다낭', region: '동남아', popular: true, group: '동남아' },
  { code: 'CXR', name: '깜라인(나트랑)', englishName: 'Cam Ranh (Nha Trang)', country: '베트남', city: '나트랑', region: '동남아', popular: true, group: '동남아' },
  { code: 'SGN', name: '호치민', englishName: 'Ho Chi Minh', country: '베트남', city: '호치민', region: '동남아', group: '동남아' },
  { code: 'HAN', name: '하노이', englishName: 'Hanoi', country: '베트남', city: '하노이', region: '동남아', group: '동남아' },
  { code: 'PQC', name: '푸꾸옥', englishName: 'Phu Quoc', country: '베트남', city: '푸꾸옥', region: '동남아', group: '동남아' },
  { code: 'SIN', name: '창이(싱가포르)', englishName: 'Changi (Singapore)', country: '싱가포르', city: '싱가포르', region: '동남아', popular: true, group: '동남아' },
  { code: 'TPE', name: '타오위안(타이베이)', englishName: 'Taoyuan (Taipei)', country: '대만', city: '타이베이', region: '동아시아', popular: true, group: '동남아' },
  { code: 'HKG', name: '홍콩', englishName: 'Hong Kong', country: '홍콩', city: '홍콩', region: '동아시아', popular: true, group: '동남아' },
  { code: 'DPS', name: '응우라라이(발리)', englishName: 'Ngurah Rai (Bali)', country: '인도네시아', city: '발리', region: '동남아', popular: true, group: '동남아' },
  { code: 'CEB', name: '세부', englishName: 'Mactan-Cebu', country: '필리핀', city: '세부', region: '동남아', popular: true, group: '동남아' },

  { code: 'GUM', name: '괌', englishName: 'Guam', country: '미국', city: '괌', region: '대양주/휴양지', popular: true, group: '미주/휴양' },
  { code: 'HNL', name: '호놀룰루(하와이)', englishName: 'Honolulu (Hawaii)', country: '미국', city: '하와이', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'LAX', name: '로스앤젤레스', englishName: 'Los Angeles', country: '미국', city: '로스앤젤레스', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'JFK', name: '존에프케네디(뉴욕)', englishName: 'JFK (New York)', country: '미국', city: '뉴욕', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'SYD', name: '시드니', englishName: 'Sydney', country: '호주', city: '시드니', region: '대양주', popular: true, group: '미주/휴양' },
  { code: 'CDG', name: '파리 샤를드골', englishName: 'Paris Charles de Gaulle', country: '프랑스', city: '파리', region: '유럽', popular: true, group: '유럽' },
  { code: 'LHR', name: '런던 히드로', englishName: 'London Heathrow', country: '영국', city: '런던', region: '유럽', popular: true, group: '유럽' },
  { code: 'FCO', name: '로마 피우미치노', englishName: 'Rome Fiumicino', country: '이탈리아', city: '로마', region: '유럽', popular: true, group: '유럽' },
  { code: 'BCN', name: '바르셀로나', englishName: 'Barcelona', country: '스페인', city: '바르셀로나', region: '유럽', popular: true, group: '유럽' },
];

export const POPULAR_DESTINATIONS = [
  { code: 'NRT', name: '도쿄(나리타)', country: '일본', emoji: '🗼', avgPrice: '280,000원~' },
  { code: 'KIX', name: '오사카', country: '일본', emoji: '🏯', avgPrice: '240,000원~' },
  { code: 'FUK', name: '후쿠오카', country: '일본', emoji: '🍜', avgPrice: '180,000원~' },
  { code: 'BKK', name: '방콕', country: '태국', emoji: '🛕', avgPrice: '320,000원~' },
  { code: 'DAD', name: '다낭', country: '베트남', emoji: '🏖️', avgPrice: '270,000원~' },
  { code: 'TPE', name: '타이베이', country: '대만', emoji: '🧋', avgPrice: '260,000원~' },
  { code: 'CXR', name: '나트랑', country: '베트남', emoji: '🏝️', avgPrice: '290,000원~' },
  { code: 'GUM', name: '괌', country: '미국', emoji: '🐬', avgPrice: '390,000원~' },
];

export const AIRLINES = [
  { code: 'KE', name: '대한항공', englishName: 'Korean Air', category: 'FSC', color: '#005CA9', baggageIncluded: true, baggageAllowance: '위탁 23kg 무료' },
  { code: 'OZ', name: '아시아나항공', englishName: 'Asiana Airlines', category: 'FSC', color: '#CB002B', baggageIncluded: true, baggageAllowance: '위탁 23kg 무료' },
  { code: '7C', name: '제주항공', englishName: 'Jeju Air', category: 'LCC', color: '#FF6400', baggageIncluded: true, baggageAllowance: '위탁 15kg 포함' },
  { code: 'LJ', name: '진에어', englishName: 'Jin Air', category: 'LCC', color: '#89C222', baggageIncluded: true, baggageAllowance: '위탁 15kg 무료' },
  { code: 'TW', name: '티웨이항공', englishName: 'T\'way Air', category: 'LCC', color: '#D71920', baggageIncluded: true, baggageAllowance: '위탁 15kg 포함' },
  { code: 'BX', name: '에어부산', englishName: 'Air Busan', category: 'LCC', color: '#002B49', baggageIncluded: true, baggageAllowance: '위탁 15kg 포함' },
  { code: 'RS', name: '에어서울', englishName: 'Air Seoul', category: 'LCC', color: '#00B1A9', baggageIncluded: true, baggageAllowance: '위탁 15kg 포함' },
  { code: 'RF', name: '에어로케이', englishName: 'Aero K', category: 'LCC', color: '#0F2C59', baggageIncluded: false, baggageAllowance: '기내 10kg' },
  { code: 'ZE', name: '이스타항공', englishName: 'Eastar Jet', category: 'LCC', color: '#D8232A', baggageIncluded: true, baggageAllowance: '위탁 15kg 포함' },
  { code: 'MM', name: '피치항공', englishName: 'Peach Aviation', category: 'Foreign_LCC', color: '#FF2A85', baggageIncluded: false, baggageAllowance: '기내 7kg' },
  { code: 'JL', name: '일본항공(JAL)', englishName: 'Japan Airlines', category: 'Foreign_FSC', color: '#CC0000', baggageIncluded: true, baggageAllowance: '위탁 23kg x 2' },
  { code: 'NH', name: '전일본공수(ANA)', englishName: 'ANA', category: 'Foreign_FSC', color: '#103986', baggageIncluded: true, baggageAllowance: '위탁 23kg x 2' },
  { code: 'VJ', name: '비엣젯항공', englishName: 'VietJet Air', category: 'Foreign_LCC', color: '#EA1D25', baggageIncluded: false, baggageAllowance: '기내 7kg' },
  { code: 'VN', name: '베트남항공', englishName: 'Vietnam Airlines', category: 'Foreign_FSC', color: '#005696', baggageIncluded: true, baggageAllowance: '위탁 23kg 무료' },
  { code: 'TG', name: '타이항공', englishName: 'Thai Airways', category: 'Foreign_FSC', color: '#4B1A76', baggageIncluded: true, baggageAllowance: '위탁 25kg 무료' },
  { code: 'SQ', name: '싱가포르항공', englishName: 'Singapore Airlines', category: 'Foreign_FSC', color: '#D19B27', baggageIncluded: true, baggageAllowance: '위탁 25kg 무료' },
  { code: 'CX', name: '캐세이퍼시픽', englishName: 'Cathay Pacific', category: 'Foreign_FSC', color: '#006564', baggageIncluded: true, baggageAllowance: '위탁 23kg 무료' },
];

export function generateNaverFlightUrl({ tripType = 'round', origin = 'ICN', destination = 'NRT', departureDate, returnDate, adults = 1, isDirect = false, fareType = 'Y' }) {
  const cleanDepDate = departureDate ? departureDate.replace(/-/g, '') : '';
  const cleanRetDate = returnDate ? returnDate.replace(/-/g, '') : '';
  const directParam = isDirect ? '&isDirect=true' : '';
  if (tripType === 'round' && cleanRetDate) {
    return `https://flight.naver.com/flights/international/${origin}-${destination}-${cleanDepDate}/${destination}-${origin}-${cleanRetDate}?adult=${adults}&child=0&infant=0&fareType=${fareType}${directParam}`;
  } else {
    return `https://flight.naver.com/flights/international/${origin}-${destination}-${cleanDepDate}?adult=${adults}&child=0&infant=0&fareType=${fareType}${directParam}`;
  }
}

function timeStringToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hh, mm] = timeStr.split(':').map(Number);
  return (hh || 0) * 60 + (mm || 0);
}

function minutesToTimeString(minutes) {
  const m = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = String(Math.floor(m / 60)).padStart(2, '0');
  const mm = String(m % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

function getDateMultiplier(dateStr) {
  if (!dateStr) return 1.0;
  const date = new Date(dateStr);
  const day = date.getDay();
  let multiplier = 1.0;
  if (day === 5) multiplier += 0.22;
  else if (day === 6) multiplier += 0.28;
  else if (day === 0) multiplier += 0.15;
  else if (day === 2 || day === 3) multiplier -= 0.10;
  return multiplier;
}

const routeMap = {
  'NRT': { duration: 155, basePrice: 150000 },
  'HND': { duration: 140, basePrice: 190000 },
  'KIX': { duration: 105, basePrice: 130000 },
  'FUK': { duration: 80,  basePrice: 100000 },
  'CTS': { duration: 170, basePrice: 190000 },
  'OKA': { duration: 135, basePrice: 160000 },
  'BKK': { duration: 340, basePrice: 190000 },
  'DMK': { duration: 345, basePrice: 170000 },
  'DAD': { duration: 275, basePrice: 160000 },
  'CXR': { duration: 295, basePrice: 170000 },
  'SGN': { duration: 335, basePrice: 180000 },
  'HAN': { duration: 280, basePrice: 160000 },
  'SIN': { duration: 380, basePrice: 240000 },
  'TPE': { duration: 165, basePrice: 145000 },
  'HKG': { duration: 220, basePrice: 160000 },
  'DPS': { duration: 420, basePrice: 320000 },
  'CEB': { duration: 265, basePrice: 155000 },
  'GUM': { duration: 270, basePrice: 220000 },
};

export function clientSearchFlights(params, filters) {
  const {
    searchMode = 'flexible',
    tripType = 'round',
    origin = 'ICN',
    destination = 'NRT',
    startDate,
    endDate,
    stayDays = 3,
    departureDate,
    returnDate,
    adults = 1,
    directOnly = false,
  } = params;

  const {
    depTimeStart = '09:00',
    depTimeEnd = '11:00',
    retTimeStart = '18:00',
    retTimeEnd = '21:00',
    selectedAirlines = [],
    selectedDaysOfWeek = [],
    airlineCategory = 'ALL',
    baggageOnly = false,
    sortBy = 'price_asc',
    maxPrice = null,
    minPrice = null,
  } = filters;

  const originAirport = AIRPORTS.find(a => a.code === origin) || { code: origin, name: origin, city: origin };
  const destAirport = AIRPORTS.find(a => a.code === destination) || { code: destination, name: destination, city: destination };
  const routeInfo = routeMap[destination] || { duration: 200, basePrice: 180000 };

  const outboundSlots = [
    { dep: '06:30', isGolden: false },
    { dep: '07:45', isGolden: false },
    { dep: '08:50', isGolden: true },
    { dep: '09:25', isGolden: true },
    { dep: '10:05', isGolden: true },
    { dep: '10:45', isGolden: true },
    { dep: '11:30', isGolden: true },
    { dep: '13:00', isGolden: false },
    { dep: '15:20', isGolden: false },
    { dep: '18:10', isGolden: true },
    { dep: '19:15', isGolden: true },
    { dep: '20:30', isGolden: true },
    { dep: '22:00', isGolden: false },
  ];

  const inboundSlots = [
    { dep: '07:30', isGolden: false },
    { dep: '09:15', isGolden: false },
    { dep: '11:45', isGolden: false },
    { dep: '14:20', isGolden: true },
    { dep: '16:40', isGolden: true },
    { dep: '18:00', isGolden: true },
    { dep: '18:50', isGolden: true },
    { dep: '19:40', isGolden: true },
    { dep: '20:35', isGolden: true },
    { dep: '21:15', isGolden: true },
    { dep: '22:45', isGolden: false },
  ];

  const depStartMins = timeStringToMinutes(depTimeStart);
  const depEndMins = timeStringToMinutes(depTimeEnd);
  const retStartMins = timeStringToMinutes(retTimeStart);
  const retEndMins = timeStringToMinutes(retTimeEnd);

  const flights = [];

  const start = new Date(searchMode === 'flexible' ? startDate : departureDate);
  const end = new Date(searchMode === 'flexible' ? endDate : departureDate);

  const curr = new Date(start);
  while (curr <= end) {
    const depStr = curr.toISOString().split('T')[0];
    const depDay = dayNames[curr.getDay()];
    const depFmt = `${curr.getMonth() + 1}.${curr.getDate()}(${depDay})`;

    let retStr = null;
    let retFmt = '';
    let retDay = '';
    let stayNights = stayDays;

    if (tripType === 'round') {
      const retDateObj = new Date(curr);
      if (searchMode === 'flexible') {
        retDateObj.setDate(curr.getDate() + stayDays);
      } else {
        const fixedRet = new Date(returnDate);
        retDateObj.setTime(fixedRet.getTime());
      }
      retStr = retDateObj.toISOString().split('T')[0];
      retDay = dayNames[retDateObj.getDay()];
      retFmt = `${retDateObj.getMonth() + 1}.${retDateObj.getDate()}(${retDay})`;
    }

    const depMult = getDateMultiplier(depStr);

    AIRLINES.forEach((airline, aIdx) => {
      let airlineMult = airline.category === 'FSC' ? 1.5 : (airline.code === 'RF' || airline.code === 'MM' ? 0.88 : 1.0);
      const count = (aIdx % 2) + 3;

      for (let i = 0; i < count; i++) {
        const outSlot = outboundSlots[(aIdx * 3 + i * 4) % outboundSlots.length];
        const outDepMins = timeStringToMinutes(outSlot.dep);
        const outArrMins = outDepMins + routeInfo.duration;
        const flightNo = `${airline.code}${300 + ((aIdx * 7 + i * 13) % 600)}`;

        let inFlight = null;
        let totalDur = routeInfo.duration;

        if (tripType === 'round' && retStr) {
          const inSlot = inboundSlots[(aIdx * 4 + i * 3 + 2) % inboundSlots.length];
          const inDepMins = timeStringToMinutes(inSlot.dep);
          const inArrMins = inDepMins + routeInfo.duration;
          const inFlightNo = `${airline.code}${700 + ((aIdx * 5 + i * 11) % 250)}`;

          inFlight = {
            flightNumber: inFlightNo,
            airline: airline,
            departureDate: retStr,
            departureDateFormatted: retFmt,
            departureDayOfWeek: retDay,
            departureTime: inSlot.dep,
            departureMinutes: inDepMins,
            arrivalTime: minutesToTimeString(inArrMins),
            origin: destAirport,
            destination: originAirport,
            durationFormatted: `${Math.floor(routeInfo.duration / 60)}시간 ${routeInfo.duration % 60}분`,
            isDirect: true,
            isGoldenTime: inSlot.isGolden,
          };
          totalDur += routeInfo.duration;
        }

        const tripFactor = tripType === 'round' ? 1.85 : 1.0;
        const baseFare = Math.round((routeInfo.basePrice * depMult * airlineMult * tripFactor) / 1000) * 1000;
        const taxes = Math.round((baseFare * 0.18) / 100) * 100;
        const fuel = Math.round((baseFare * 0.12) / 100) * 100;
        const pricePerAdult = baseFare + taxes + fuel;
        const totalAmount = pricePerAdult * adults;

        flights.push({
          id: `f-${airline.code}-${flightNo}-${depStr}-${i}`,
          airline,
          tripType,
          isDirect: true,
          departureDate: depStr,
          returnDate: retStr,
          departureDateFormatted: depFmt,
          returnDateFormatted: retFmt,
          stayDaysFormatted: `${stayNights}박 ${stayNights + 1}일`,
          scheduleLabel: `${depFmt} ~ ${retFmt} (${stayNights}박 ${stayNights + 1}일)`,
          outbound: {
            flightNumber: flightNo,
            airline,
            departureDate: depStr,
            departureDateFormatted: depFmt,
            departureDayOfWeek: depDay,
            departureTime: outSlot.dep,
            departureMinutes: outDepMins,
            arrivalTime: minutesToTimeString(outArrMins),
            origin: originAirport,
            destination: destAirport,
            durationFormatted: `${Math.floor(routeInfo.duration / 60)}시간 ${routeInfo.duration % 60}분`,
            isDirect: true,
            isGoldenTime: outSlot.isGolden,
          },
          inbound: inFlight,
          totalDurationMinutes: totalDur,
          pricing: {
            baseFare,
            taxes,
            fuelSurcharge: fuel,
            pricePerAdult,
            totalAmount,
            formattedPrice: `${pricePerAdult.toLocaleString('ko-KR')}원`,
            formattedTotalPrice: `${totalAmount.toLocaleString('ko-KR')}원`,
          },
          baggage: {
            included: airline.baggageIncluded,
            allowance: airline.baggageAllowance,
            cabinBaggage: '기내 10kg 무료',
          },
          remainingSeats: Math.floor(Math.random() * 8) + 2,
          naverUrl: generateNaverFlightUrl({
            tripType,
            origin,
            destination,
            departureDate: depStr,
            returnDate: retStr,
            adults,
            isDirect: true,
          }),
        });
      }
    });

    curr.setDate(curr.getDate() + 1);
  }

  // 필터링 적용
  const airlineStatsMap = {};
  flights.forEach(f => {
    const code = f.airline.code;
    if (!airlineStatsMap[code]) {
      airlineStatsMap[code] = { airline: f.airline, count: 0, minPrice: f.pricing.pricePerAdult };
    } else {
      airlineStatsMap[code].count += 1;
      if (f.pricing.pricePerAdult < airlineStatsMap[code].minPrice) {
        airlineStatsMap[code].minPrice = f.pricing.pricePerAdult;
      }
    }
  });

  const availableAirlines = Object.values(airlineStatsMap).sort((a, b) => a.minPrice - b.minPrice);

  const filtered = flights.filter(f => {
    const outMins = f.outbound.departureMinutes;
    if (outMins < depStartMins || outMins > depEndMins) return false;
    if (f.inbound) {
      const inMins = f.inbound.departureMinutes;
      if (inMins < retStartMins || inMins > retEndMins) return false;
    }
    if (selectedDaysOfWeek.length > 0 && !selectedDaysOfWeek.includes(f.outbound.departureDayOfWeek)) return false;
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(f.airline.code)) return false;
    if (airlineCategory !== 'ALL') {
      if (airlineCategory === 'FSC' && !f.airline.category.includes('FSC')) return false;
      if (airlineCategory === 'LCC' && f.airline.category !== 'LCC') return false;
      if (airlineCategory === 'FOREIGN' && !f.airline.category.startsWith('Foreign')) return false;
    }
    if (baggageOnly && !f.baggage.included) return false;
    return true;
  });

  const minPriceFound = filtered.length > 0 ? Math.min(...filtered.map(f => f.pricing.pricePerAdult)) : 0;
  const maxPriceFound = filtered.length > 0 ? Math.max(...filtered.map(f => f.pricing.pricePerAdult)) : 1;

  const scored = filtered.map(f => {
    const priceScore = 100 - ((f.pricing.pricePerAdult - minPriceFound) / ((maxPriceFound - minPriceFound) || 1)) * 50;
    let score = Math.round(priceScore * 0.6 + (f.outbound.isGoldenTime ? 20 : 10) + (f.baggage.included ? 20 : 10));
    return {
      ...f,
      score: Math.min(99, Math.max(65, score)),
      isCheapest: f.pricing.pricePerAdult === minPriceFound,
    };
  });

  const sorted = [...scored].sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricing.pricePerAdult - b.pricing.pricePerAdult;
    if (sortBy === 'date_asc') return a.departureDate.localeCompare(b.departureDate);
    return b.score - a.score;
  });

  return {
    success: true,
    totalSearched: flights.length,
    filteredCount: sorted.length,
    availableAirlines,
    priceSummary: {
      min: minPriceFound,
      max: maxPriceFound,
      formattedMin: `${minPriceFound.toLocaleString('ko-KR')}원`,
    },
    recommendations: {
      bestPrice: sorted[0] || null,
      bestValue: [...sorted].sort((a, b) => b.score - a.score)[0] || null,
      bestSchedule: sorted.find(f => f.outbound.isGoldenTime) || sorted[0] || null,
    },
    flights: sorted,
    mainNaverUrl: generateNaverFlightUrl({
      tripType,
      origin,
      destination,
      departureDate: startDate || departureDate,
      returnDate: endDate || returnDate,
      adults,
      isDirect: directOnly,
    }),
  };
}
