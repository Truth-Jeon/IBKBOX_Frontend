function Footer() {
  return (
      <div className="footer">
          <ul>
              <li>
                  <a href="#">이용약관</a>
              </li>
              <li>
                  <a href="#">개인정보처리방침</a>
              </li>
              <li>
                  <a href="#">인증센터</a>
              </li>
              <li>
                  <a href="#">사용자메뉴얼</a>
              </li>
          </ul>
          <div className='footer__info'>
              <p className='footer__address'>
                  <span>(04541)서울 중구 을지로79, 중소기업은행</span><span>대표: 윤종원</span><span>사업자등록번호: 202-81-00978</span><span>통신판매번호: 2020-서울중구-1163</span>
              </p>
              <p className="footer__copyright">
                  Copyright © IBK(INDUSTRIAL BANK OF KOREA).All rights reserved.
              </p>
          </div>
      </div>
  )
}

export default Footer
