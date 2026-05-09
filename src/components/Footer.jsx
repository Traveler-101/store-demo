export default function Footer() {
  const slogans = [
    { icon: 0, text: '价格亲民' },
    { icon: 1, text: '物流快捷' },
    { icon: 2, text: '品质新鲜' },
    { icon: 3, text: '售后无忧' },
  ]

  const services = [
    {
      title: '购物指南',
      items: ['购物流程', '支付方式', '售后规则'],
    },
    {
      title: '配送方式',
      items: ['配送运费', '配送范围', '配送时间'],
    },
    {
      title: '关于我们',
      items: ['平台规则', '联系我们', '问题反馈'],
    },
    {
      title: '售后服务',
      items: ['售后政策', '退款说明', '取消订单'],
    },
    {
      title: '服务热线',
      items: [
        <a href="#">在线客服 <i className="iconfont icon-customer-service text-primary"></i></a>,
        '客服电话 400-0000-000',
        '工作时间 周一至周日 8:00-18:00',
      ],
    },
  ]

  const footerLinks = ['关于我们', '联系我们', '配送与验收', '商务合作', '搜索推荐', '友情链接']

  const getIconStyle = (iconIndex) => {
    const positions = ['0 0', '0 -58px', '0 -116px', '0 -174px']
    return { backgroundPosition: positions[iconIndex] }
  }

  return (
    <div className="footer bg-[#f5f5f5] py-8 lg:py-0 lg:h-[588px]">
      <div className="w">
        <div className="slogan border-b border-[#e8e8e8] lg:h-[178px]">
          <ul className="flex justify-evenly items-center h-full flex-wrap lg:flex-nowrap">
            {slogans.map((slogan, index) => (
              <li key={index} className="flex items-center p-4 lg:p-0">
                <h5 
                  className="w-[58px] h-[58px] lg:w-[58px] lg:h-[58px] md:w-[48px] md:h-[48px] sm:w-[38px] sm:h-[38px] bg-[url('../images/sprite.png')] bg-no-repeat bg-contain"
                  style={getIconStyle(slogan.icon)}
                ></h5>
                <p className="text-[28px] lg:text-[28px] md:text-[20px] sm:text-[16px] ml-[28px] lg:ml-[28px] md:ml-[16px] sm:ml-[10px]">{slogan.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="service flex justify-between mt-[60px] lg:mt-[60px] md:mt-[40px] sm:mt-[20px] flex-col lg:flex-row">
          <div className="service-left flex gap-[84px] lg:gap-[84px] md:gap-[40px] sm:gap-[20px] flex-wrap lg:flex-nowrap">
            {services.map((service, index) => (
              <dl key={index} className="lg:block md:block sm:block">
                <dt className="text-lg lg:text-lg md:text-base sm:text-sm mb-[30px] lg:mb-[30px] md:mb-[15px] sm:mb-[10px]">{service.title}</dt>
                {service.items.map((item, itemIndex) => (
                  <dd key={itemIndex} className="mb-[10px]">
                    {typeof item === 'string' ? (
                      <a href="#" className="text-[#969696] block mb-[15px] lg:mb-[15px] md:mb-[8px] sm:mb-[5px] text-sm">{item}</a>
                    ) : (
                      item
                    )}
                  </dd>
                ))}
              </dl>
            ))}
          </div>
          <div className="service-right mt-8 lg:mt-0">
            <ul className="flex text-center flex-col lg:flex-row">
              <li className="text-[#969696]">
                <img src="./images/app.png" alt="" className="w-[110px] h-[110px] lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] sm:w-[70px] sm:h-[70px]" />
                <p className="mt-[10px] text-sm">微信公众号</p>
              </li>
              <li className="ml-[55px] lg:ml-[55px] md:ml-[30px] sm:ml-0 mt-4 lg:mt-0 md:mt-4 sm:mt-4 text-[#969696]">
                <img src="./images/app.png" alt="" className="w-[110px] h-[110px] lg:w-[110px] lg:h-[110px] md:w-[90px] md:h-[90px] sm:w-[70px] sm:h-[70px]" />
                <p className="mt-[10px] text-sm">APP下载二维码</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright text-center mt-[100px] lg:mt-[100px] md:mt-[40px] sm:mt-[20px] leading-[30px] text-[#a1a1a1]">
          <p className="flex flex-wrap justify-center gap-2">
            {footerLinks.map((link, index) => (
              <span key={index}>
                <a href="#" className="text-[#a1a1a1] hover:text-secondary transition-colors text-sm">
                  {link}
                </a>
                {index < footerLinks.length - 1 && <span className="mx-2">|</span>}
              </span>
            ))}
          </p>
          <p className="text-sm">CopyRight © 小兔鲜</p>
        </div>
      </div>
    </div>
  )
}
