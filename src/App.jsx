import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import PopularDestinations from './components/PopularDestinations.jsx';
import FilterBar from './components/FilterBar.jsx';
import SmartRecommendations from './components/SmartRecommendations.jsx';
import PriceTrendChart from './components/PriceTrendChart.jsx';
import FlightList from './components/FlightList.jsx';
import ShareModal from './components/ShareModal.jsx';
import PriceAlertModal from './components/PriceAlertModal.jsx';
import { AIRPORTS, POPULAR_DESTINATIONS, clientSearchFlights } from './services/flightEngine.js';

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function App() {
  const defaultStart = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return formatDate(d);
  }, []);

  const defaultEnd = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 28);
    return formatDate(d);
  }, []);

  const getInitialParams = () => {
    const search = new URLSearchParams(window.location.search);
    return {
      searchMode: search.get('mode') || 'flexible',
      tripType: search.get('tripType') || 'round',
      origin: search.get('origin') || 'ICN',
      destination: search.get('destination') || 'NRT',
      startDate: search.get('start') || defaultStart,
      endDate: search.get('end') || defaultEnd,
      stayDays: parseInt(search.get('stay'), 10) || 3,
      departureDate: search.get('depDate') || defaultStart,
      returnDate: search.get('retDate') || defaultEnd,
      adults: parseInt(search.get('adults'), 10) || 1,
      directOnly: search.get('directOnly') === 'true',
    };
  };

  const getInitialFilters = () => {
    const search = new URLSearchParams(window.location.search);
    const airlinesParam = search.get('airlines');
    const daysParam = search.get('days');
    return {
      depTimeStart: search.get('depStart') || '09:00',
      depTimeEnd: search.get('depEnd') || '11:00',
      retTimeStart: search.get('retStart') || '18:00',
      retTimeEnd: search.get('retEnd') || '21:00',
      selectedAirlines: airlinesParam ? airlinesParam.split(',') : [],
      selectedDaysOfWeek: daysParam ? daysParam.split(',') : [],
      airlineCategory: search.get('category') || 'ALL',
      baggageOnly: search.get('baggage') === 'true',
      sortBy: search.get('sort') || 'price_asc',
    };
  };

  const [searchParams, setSearchParams] = useState(getInitialParams);
  const [filters, setFilters] = useState(getInitialFilters);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [airports, setAirports] = useState(AIRPORTS);
  const [popularDestinations, setPopularDestinations] = useState(POPULAR_DESTINATIONS);
  const [searchResults, setSearchResults] = useState(null);
  const [priceTrends, setPriceTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    axios.get('/api/airports')
      .then(res => {
        if (res.data.airports) setAirports(res.data.airports);
        if (res.data.popularDestinations) setPopularDestinations(res.data.popularDestinations);
      })
      .catch(() => {
        setAirports(AIRPORTS);
        setPopularDestinations(POPULAR_DESTINATIONS);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('mode', searchParams.searchMode);
    params.set('tripType', searchParams.tripType);
    params.set('origin', searchParams.origin);
    params.set('destination', searchParams.destination);

    if (searchParams.searchMode === 'flexible') {
      params.set('start', searchParams.startDate);
      params.set('end', searchParams.endDate);
      params.set('stay', searchParams.stayDays);
    } else {
      params.set('depDate', searchParams.departureDate);
      if (searchParams.returnDate) params.set('retDate', searchParams.returnDate);
    }

    params.set('adults', searchParams.adults);
    if (searchParams.directOnly) params.set('directOnly', 'true');

    params.set('depStart', filters.depTimeStart);
    params.set('depEnd', filters.depTimeEnd);
    params.set('retStart', filters.retTimeStart);
    params.set('retEnd', filters.retTimeEnd);

    if (filters.selectedAirlines.length > 0) params.set('airlines', filters.selectedAirlines.join(','));
    if (filters.selectedDaysOfWeek.length > 0) params.set('days', filters.selectedDaysOfWeek.join(','));
    if (filters.airlineCategory !== 'ALL') params.set('category', filters.airlineCategory);
    if (filters.baggageOnly) params.set('baggage', 'true');
    if (filters.sortBy !== 'price_asc') params.set('sort', filters.sortBy);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [searchParams, filters]);

  const executeSearch = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const searchRes = await axios.post('/api/flights/search', {
        ...searchParams,
        ...filters,
      });
      setSearchResults(searchRes.data);
      setLastUpdated(new Date());

      const trendsRes = await axios.get('/api/flights/trends', {
        params: {
          tripType: searchParams.tripType,
          origin: searchParams.origin,
          destination: searchParams.destination,
          departureDate: searchParams.startDate || searchParams.departureDate,
          stayDays: searchParams.stayDays || 3,
        }
      });
      setPriceTrends(trendsRes.data.trends || []);
    } catch {
      const localResult = clientSearchFlights(searchParams, filters);
      setSearchResults(localResult);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchParams, filters]);

  useEffect(() => {
    executeSearch();
  }, []);

  const handleManualRefresh = () => {
    executeSearch(true);
  };

  const handleResetFilters = () => {
    setFilters({
      depTimeStart: '00:00',
      depTimeEnd: '23:59',
      retTimeStart: '00:00',
      retTimeEnd: '23:59',
      selectedAirlines: [],
      selectedDaysOfWeek: [],
      airlineCategory: 'ALL',
      baggageOnly: false,
      sortBy: 'price_asc',
    });
  };

  const handleSelectPopularDestination = (destCode) => {
    setSearchParams(prev => ({ ...prev, destination: destCode }));
    setTimeout(() => {
      executeSearch();
    }, 100);
  };

  const handleSelectTrendDate = (newDepDate, newRetDate) => {
    setSearchParams(prev => ({
      ...prev,
      startDate: newDepDate,
      departureDate: newDepDate,
      returnDate: newRetDate || prev.returnDate,
    }));
    setTimeout(() => {
      executeSearch();
    }, 100);
  };

  const currentLowestPrice = searchResults?.priceSummary?.min || null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-naver-green selection:text-white">
      <Navbar
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAlert={() => setIsAlertOpen(true)}
        mainNaverUrl={searchResults?.mainNaverUrl}
        lastUpdated={lastUpdated}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
      />

      <HeroSearch
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        filters={filters}
        setFilters={setFilters}
        onSearch={() => executeSearch(false)}
        isLoading={isLoading}
        airports={airports}
      />

      <PopularDestinations
        destinations={popularDestinations}
        onSelectDestination={handleSelectPopularDestination}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {searchResults?.recommendations && (
          <SmartRecommendations
            recommendations={searchResults.recommendations}
          />
        )}

        {priceTrends.length > 0 && (
          <PriceTrendChart
            trends={priceTrends}
            currentDepartureDate={searchParams.startDate || searchParams.departureDate}
            onSelectDate={handleSelectTrendDate}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 sticky top-20 z-30">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              availableAirlines={searchResults?.availableAirlines || []}
              tripType={searchParams.tripType}
              onResetFilters={handleResetFilters}
              totalFilteredCount={searchResults?.filteredCount || 0}
            />
          </div>

          <div className="lg:col-span-8">
            <FlightList
              flights={searchResults?.flights || []}
              sortBy={filters.sortBy}
              setSortBy={(newSort) => setFilters(prev => ({ ...prev, sortBy: newSort }))}
              adults={searchParams.adults}
              onResetFilters={handleResetFilters}
              lastUpdated={lastUpdated}
              onRefresh={handleManualRefresh}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center space-x-2 font-bold text-slate-700">
            <span>✈️ 네이버 항공권 스마트 파인더</span>
            <span>·</span>
            <span className="text-naver-green">유연 기간 & 시간대 맞춤 최저가</span>
          </div>
          <p>
            특정 날짜 고정 없이 원하는 기간 및 출발/귀국 시간대 조건에 부합하는 최저가 일정을 혼합 비교합니다.
          </p>
          <p className="text-[11px] text-slate-400">
            마지막 데이터 동기화: {lastUpdated.toLocaleTimeString('ko-KR')} (새로고침 버튼으로 언제든 최신 운임 갱신)
          </p>
        </div>
      </footer>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        searchParams={searchParams}
        filters={filters}
        lowestPrice={currentLowestPrice}
      />

      <PriceAlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        destinationName={searchResults?.destination?.name || searchParams.destination}
        currentLowestPrice={currentLowestPrice}
      />
    </div>
  );
}
