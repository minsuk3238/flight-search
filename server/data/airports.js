export const AIRPORTS = [
  // 국내 출발 공항
  { code: 'ICN', name: '인천', englishName: 'Incheon', country: '대한민국', city: '서울/인천', type: 'domestic_hub', group: '국내' },
  { code: 'GMP', name: '김포', englishName: 'Gimpo', country: '대한민국', city: '서울/김포', type: 'domestic_hub', group: '국내' },
  { code: 'PUS', name: '김해(부산)', englishName: 'Gimhae (Busan)', country: '대한민국', city: '부산', type: 'domestic', group: '국내' },
  { code: 'CJU', name: '제주', englishName: 'Jeju', country: '대한민국', city: '제주', type: 'domestic', group: '국내' },
  { code: 'TAE', name: '대구', englishName: 'Daegu', country: '대한민국', city: '대구', type: 'domestic', group: '국내' },
  { code: 'CJJ', name: '청주', englishName: 'Cheongju', country: '대한민국', city: '청주', type: 'domestic', group: '국내' },

  // 일본
  { code: 'NRT', name: '나리타(도쿄)', englishName: 'Narita (Tokyo)', country: '일본', city: '도쿄', region: '동아시아', popular: true, group: '일본' },
  { code: 'HND', name: '하네다(도쿄)', englishName: 'Haneda (Tokyo)', country: '일본', city: '도쿄', region: '동아시아', popular: true, group: '일본' },
  { code: 'KIX', name: '간사이(오사카)', englishName: 'Kansai (Osaka)', country: '일본', city: '오사카', region: '동아시아', popular: true, group: '일본' },
  { code: 'FUK', name: '후쿠오카', englishName: 'Fukuoka', country: '일본', city: '후쿠오카', region: '동아시아', popular: true, group: '일본' },
  { code: 'CTS', name: '신치토세(삿포로)', englishName: 'New Chitose (Sapporo)', country: '일본', city: '삿포로', region: '동아시아', popular: true, group: '일본' },
  { code: 'OKA', name: '오키나와(나하)', englishName: 'Naha (Okinawa)', country: '일본', city: '오키나와', region: '동아시아', popular: true, group: '일본' },

  // 동남아시아
  { code: 'BKK', name: '수완나품(방콕)', englishName: 'Suvarnabhumi (Bangkok)', country: '태국', city: '방콕', region: '동남아', popular: true, group: '동남아' },
  { code: 'DMK', name: '돈므앙(방콕)', englishName: 'Don Mueang (Bangkok)', country: '태국', city: '방콕', region: '동남아', group: '동남아' },
  { code: 'DAD', name: '다낭', englishName: 'Da Nang', country: '베트남', city: '다낭', region: '동남아', popular: true, group: '동남아' },
  { code: 'CXR', name: '깜라인(나트랑)', englishName: 'Cam Ranh (Nha Trang)', country: '베트남', city: '나트랑', region: '동남아', popular: true, group: '동남아' },
  { code: 'SGN', name: '호치민', englishName: 'Ho Chi Minh', country: '베트남', city: '호치민', region: '동남아', group: '동남아' },
  { code: 'HAN', name: '하노이', englishName: 'Hanoi', country: '베트남', city: '하노이', region: '동남아', group: '동남아' },
  { code: 'PQC', name: '푸꾸옥', englishName: 'Phu Quoc', country: '베트남', city: '푸꾸옥', region: '동남아', group: '동남아' },
  { code: 'SIN', name: '창이(싱가포르)', englishName: 'Changi (Singapore)', country: '싱가포르', city: '싱가포르', region: '동남아', popular: true, group: '동남아' },
  { code: 'TPE', name: '타오위안(타이베이)', englishName: 'Taoyuan (Taipei)', country: '대만', city: '타이베이', region: '동아시아', popular: true, group: '동남아/대만' },
  { code: 'HKG', name: '홍콩', englishName: 'Hong Kong', country: '홍콩', city: '홍콩', region: '동아시아', popular: true, group: '동남아/대만' },
  { code: 'DPS', name: '응우라라이(발리)', englishName: 'Ngurah Rai (Bali)', country: '인도네시아', city: '발리', region: '동남아', popular: true, group: '동남아' },
  { code: 'CEB', name: '세부', englishName: 'Mactan-Cebu', country: '필리핀', city: '세부', region: '동남아', popular: true, group: '동남아' },
  { code: 'MNL', name: '마닐라', englishName: 'Ninoy Aquino (Manila)', country: '필리핀', city: '마닐라', region: '동남아', group: '동남아' },
  { code: 'KUL', name: '쿠알라룸푸르', englishName: 'Kuala Lumpur', country: '말레이시아', city: '쿠알라룸푸르', region: '동남아', group: '동남아' },

  // 미주 / 대양주 / 괌·사이판
  { code: 'GUM', name: '괌', englishName: 'Guam', country: '미국', city: '괌', region: '대양주/휴양지', popular: true, group: '미주/휴양' },
  { code: 'SPN', name: '사이판', englishName: 'Saipan', country: '미국', city: '사이판', region: '대양주/휴양지', group: '미주/휴양' },
  { code: 'HNL', name: '호놀룰루(하와이)', englishName: 'Honolulu (Hawaii)', country: '미국', city: '하와이', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'LAX', name: '로스앤젤레스', englishName: 'Los Angeles', country: '미국', city: '로스앤젤레스', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'JFK', name: '존에프케네디(뉴욕)', englishName: 'JFK (New York)', country: '미국', city: '뉴욕', region: '미주', popular: true, group: '미주/휴양' },
  { code: 'SFO', name: '샌프란시스코', englishName: 'San Francisco', country: '미국', city: '샌프란시스코', region: '미주', group: '미주/휴양' },
  { code: 'SYD', name: '시드니', englishName: 'Sydney', country: '호주', city: '시드니', region: '대양주', popular: true, group: '대양주' },

  // 유럽
  { code: 'CDG', name: '파리 샤를드골', englishName: 'Paris Charles de Gaulle', country: '프랑스', city: '파리', region: '유럽', popular: true, group: '유럽' },
  { code: 'LHR', name: '런던 히드로', englishName: 'London Heathrow', country: '영국', city: '런던', region: '유럽', popular: true, group: '유럽' },
  { code: 'FCO', name: '로마 피우미치노', englishName: 'Rome Fiumicino', country: '이탈리아', city: '로마', region: '유럽', popular: true, group: '유럽' },
  { code: 'BCN', name: '바르셀로나', englishName: 'Barcelona', country: '스페인', city: '바르셀로나', region: '유럽', popular: true, group: '유럽' },
  { code: 'FRA', name: '프랑크푸르트', englishName: 'Frankfurt', country: '독일', city: '프랑크푸르트', region: '유럽', group: '유럽' },
  { code: 'IST', name: '이스탄불', englishName: 'Istanbul', country: '튀르키예', city: '이스탄불', region: '유럽/중동', group: '유럽' },
];

export const POPULAR_DESTINATIONS = [
  { code: 'NRT', name: '도쿄(나리타)', country: '일본', emoji: '🗼', avgPrice: '280,000원~', tag: '가장 인기' },
  { code: 'KIX', name: '오사카', country: '일본', emoji: '🏯', avgPrice: '240,000원~', tag: '미식 여행' },
  { code: 'FUK', name: '후쿠오카', country: '일본', emoji: '🍜', avgPrice: '180,000원~', tag: '가성비 최고' },
  { code: 'BKK', name: '방콕', country: '태국', emoji: '🛕', avgPrice: '320,000원~', tag: '동남아 1위' },
  { code: 'DAD', name: '다낭', country: '베트남', emoji: '🏖️', avgPrice: '270,000원~', tag: '가족 휴양' },
  { code: 'TPE', name: '타이베이', country: '대만', emoji: '🧋', avgPrice: '260,000원~', tag: '야시장 투어' },
  { code: 'CXR', name: '나트랑', country: '베트남', emoji: '🏝️', avgPrice: '290,000원~', tag: '스파 & 리조트' },
  { code: 'GUM', name: '괌', country: '미국', emoji: '🐬', avgPrice: '390,000원~', tag: '쇼핑 & 휴양' },
];
