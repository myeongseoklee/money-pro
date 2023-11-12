INSERT INTO money_pro.expenditure_category (code, name, parent_code, sort_order)
VALUES 
  ('001000', '식비', NULL, 1),
  ('002000', '주거/통신', NULL, 2),
  ('003000', '생활용품', NULL, 3),
  ('004000', '의복/미용', NULL, 4),
  ('005000', '건강/문화', NULL, 5),
  ('006000', '교육/육아', NULL, 6),
  ('007000', '교통/차량', NULL, 7),
  ('008000', '경조사/회비', NULL, 8),
  ('009000', '세금/이자', NULL, 9),
  ('010000', '용돈/기타', NULL, 10),
  ('012000', '저축/보험', NULL, 12),
  ('013000', '이체/대체', NULL, 13),
  ('011000', '카드대금', NULL, 14),
  ('001001', '주식', '001000', 1),
  ('002001', '관리비', '002000', 1),
  ('003001', '가구/가전', '003000', 1),
  ('004001', '의류비', '004000', 1),
  ('005001', '운동/레저', '005000', 1),
  ('006001', '등록금', '006000', 1),
  ('007001', '대중교통비', '007000', 1),
  ('008001', '경조사비', '008000', 1),
  ('009001', '세금', '009000', 1),
  ('010001', '용돈', '010000', 1),
  ('011001', '카드대금', '011000', 1),
  ('012001', '예금', '012000', 1),
  ('001002', '부식', '001000', 2),
  ('002002', '공과금', '002000', 2),
  ('003002', '주방/욕실', '003000', 2),
  ('004002', '패션잡화', '004000', 2),
  ('005002', '문화생활', '005000', 2),
  ('006002', '학원/교재비', '006000', 2),
  ('007002', '주유비', '007000', 2),
  ('008002', '모임회비', '008000', 2),
  ('009002', '대출이자', '009000', 2),
  ('010002', '기타', '010000', 2),
  ('012002', '적금', '012000', 2),
  ('001003', '간식', '001000', 3),
  ('002003', '이동통신', '002000', 3),
  ('003003', '잡화소모', '003000', 3),
  ('004003', '헤어/뷰티', '004000', 3),
  ('005003', '여행', '005000', 3),
  ('006003', '육아용품', '006000', 3),
  ('007003', '자동차보험', '007000', 3),
  ('008003', '데이트', '008000', 3),
  ('009003', '기타', '009000', 3),
  ('012003', '펀드', '012000', 3),
  ('001004', '외식', '001000', 4),
  ('002004', '인터넷', '002000', 4),
  ('003004', '기타', '003000', 4),
  ('004004', '세탁수선비', '004000', 4),
  ('005004', '병원비', '005000', 4),
  ('006004', '기타', '006000', 4),
  ('007004', '기타', '007000', 4),
  ('008004', '선물', '008000', 4),
  ('012004', '보험', '012000', 4),
  ('001005', '커피/음료', '001000', 5),
  ('002005', '월세', '002000', 5),
  ('004005', '기타', '004000', 5),
  ('005006', '보장성보험', '005000', 5),
  ('008005', '기타', '008000', 5),
  ('012005', '투자', '012000', 5),
  ('001006', '술/유흥', '001000', 6),
  ('002006', '기타', '002000', 6),
  ('005005', '기타', '005000', 6),
  ('012006', '기타', '012000', 6),
  ('001007', '기타', '001000', 7);
;