import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { AIRPORTS, POPULAR_DESTINATIONS } from './data/airports.js';
import { AIRLINES } from './data/airlines.js';
import { searchFlexibleRangeFlights, searchFlights, getPriceTrends, generateNaverFlightUrl } from './services/naverFlightService.js';
import { filterAndAnalyzeFlights } from './services/flightAnalyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. 공항 및 인기 목적지 목록 API
app.get('/api/airports', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.json({
      airports: AIRPORTS,
      popularDestinations: POPULAR_DESTINATIONS,
    });
  }

  const filtered = AIRPORTS.filter(a =>
    a.code.toLowerCase().includes(query) ||
    a.name.toLowerCase().includes(query) ||
    a.englishName.toLowerCase().includes(query) ||
    a.city.toLowerCase().includes(query) ||
    a.country.toLowerCase().includes(query)
  );

  res.json({
    airports: filtered,
    popularDestinations: POPULAR_DESTINATIONS,
  });
});

// 2. 항공사 목록 API
app.get('/api/airlines', (req, res) => {
  res.json({
    airlines: AIRLINES,
  });
});

// 3. 유연한 기간 & 시간대 정밀 항공권 통합 검색 API
app.post('/api/flights/search', async (req, res) => {
  try {
    const {
      searchMode = 'flexible', // 'flexible' (기간 범위 내 탐색) | 'fixed' (특정 단일 날짜)
      tripType = 'round',
      origin = 'ICN',
      destination = 'NRT',
      // 유연 기간 모드 파라미터
      startDate, // 'YYYY-MM-DD'
      endDate,   // 'YYYY-MM-DD'
      stayDays = 3, // 3박4일 (3)
      stayDaysMin = 3,
      stayDaysMax = 3,
      // 고정 날짜 모드 파라미터
      departureDate,
      returnDate,
      adults = 1,
      // 사용자 지정 시간대 필터 (핵심!)
      depTimeStart = '09:00',
      depTimeEnd = '11:00',
      retTimeStart = '18:00',
      retTimeEnd = '21:00',
      // 항공사 및 기타 필터
      selectedAirlines = [],
      airlineCategory = 'ALL',
      directOnly = false,
      maxPrice = null,
      minPrice = null,
      baggageOnly = false,
      sortBy = 'price_asc',
      selectedDaysOfWeek = [],
    } = req.body;

    let rawResult;

    if (searchMode === 'flexible') {
      const actualStart = startDate || departureDate;
      const actualEnd = endDate || (() => {
        const d = new Date(actualStart || new Date());
        d.setDate(d.getDate() + 14);
        return d.toISOString().split('T')[0];
      })();

      rawResult = await searchFlexibleRangeFlights({
        tripType,
        origin,
        destination,
        startDate: actualStart,
        endDate: actualEnd,
        stayDays: Number(stayDays) || 3,
        stayDaysMin: Number(stayDaysMin) || Number(stayDays) || 3,
        stayDaysMax: Number(stayDaysMax) || Number(stayDays) || 3,
        adults: Number(adults) || 1,
        directOnly: false,
      });
    } else {
      rawResult = await searchFlights({
        tripType,
        origin,
        destination,
        departureDate,
        returnDate,
        adults: Number(adults) || 1,
        directOnly: false,
      });
    }

    // 시간대 및 조건 필터 적용
    const analyzedResult = filterAndAnalyzeFlights(rawResult.flights, {
      depTimeStart,
      depTimeEnd,
      retTimeStart,
      retTimeEnd,
      selectedAirlines,
      airlineCategory,
      directOnly,
      maxPrice,
      minPrice,
      baggageOnly,
      sortBy,
      selectedDaysOfWeek,
    });

    const mainNaverUrl = generateNaverFlightUrl({
      tripType,
      origin,
      destination,
      departureDate: startDate || departureDate,
      returnDate: endDate || returnDate,
      adults: Number(adults) || 1,
      isDirect: directOnly,
    });

    res.json({
      success: true,
      searchMode,
      origin: rawResult.origin,
      destination: rawResult.destination,
      startDate: startDate || departureDate,
      endDate: endDate || returnDate,
      departureDate,
      returnDate,
      tripType,
      adults,
      mainNaverUrl,
      timeCriteria: {
        depTimeStart,
        depTimeEnd,
        retTimeStart,
        retTimeEnd,
      },
      ...analyzedResult,
    });
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: '항공권 검색 중 오류가 발생했습니다.', details: error.message });
  }
});

// 4. 기간별 트렌드 API
app.get('/api/flights/trends', async (req, res) => {
  try {
    const {
      tripType = 'round',
      origin = 'ICN',
      destination = 'NRT',
      departureDate,
      stayDays = 3,
    } = req.query;

    const trends = await getPriceTrends({
      tripType,
      origin,
      destination,
      centerDepartureDate: departureDate || new Date().toISOString().split('T')[0],
      stayDurationDays: parseInt(stayDays, 10) || 3,
    });

    res.json({
      success: true,
      origin,
      destination,
      trends,
    });
  } catch (error) {
    console.error('Price trends error:', error);
    res.status(500).json({ error: '가격 트렌드 조회 실패', details: error.message });
  }
});

const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`✈️ Naver Flight Finder Server running on http://localhost:${PORT}`);
});
