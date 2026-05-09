import { hotBrands } from '../data/products'

export default function Brand() {
  return (
    <div className="brand bg-[#F5F5F5] py-[40px]">
      <div className="w">
        <div className="box-hd h-[82px]">
          <h2 className="h-[42px] leading-[42px] text-[30px] lg:text-[30px] md:text-[24px] sm:text-[20px]">
            热门品牌 <small className="text-base text-[#a1a1a1] ml-[30px] hidden md:block">国际经典 品质认证</small>
          </h2>
          <div className="brand-page mt-1 mb-[15px] h-[20px] leading-[20px] text-right">
            <a href="#" className="inline-block mr-2">
              <img src="./images/left.png" alt="" className="w-[20px]" />
            </a>
            <a href="#">
              <img src="./images/right.png" alt="" className="w-[20px]" />
            </a>
          </div>
        </div>
        <div className="box-bd">
          <ul className="flex justify-between flex-wrap gap-2 lg:flex-nowrap">
            {hotBrands.map((brand) => (
              <li key={brand.id} className="w-[244px] lg:w-[244px] md:w-[calc(33.333%-8px)] sm:w-[calc(50%-4px)] h-[306px] lg:h-[306px] md:h-[250px] sm:h-[200px]">
                <a href="#">
                  <img
                    src={brand.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
