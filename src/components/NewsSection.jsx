import { newsTopics } from '../data/products'

export default function NewsSection() {
  return (
    <div className="w mb-[40px]">
      <div className="head flex justify-between items-center h-[102px]">
        <h2 className="text-[30px]">最新专题</h2>
        <a href="#" className="more text-base text-[#a1a1a1] hover:text-secondary transition-colors">
          查看更多 <i className="iconfont icon-arrow-right-bold"></i>
        </a>
      </div>
      <div className="news">
        <ul className="flex gap-[12px]">
          {newsTopics.map((topic) => (
            <li key={topic.id} className="flex-1 h-[355px]">
              <div className="img">
                <img src={topic.image} alt="" className="w-full" />
              </div>
              <div className="con h-[67px] flex justify-between items-center px-[15px] text-sm text-[#666]">
                <p>
                  <span className="like mr-[20px]">
                    <i className="iconfont icon-fabulous"></i>
                    {topic.likes}
                  </span>
                  <span className="view">
                    <i className="iconfont icon-browse"></i>
                    {topic.views}
                  </span>
                </p>
                <p className="reply">
                  <i className="iconfont icon-comment"></i>
                  {topic.replies}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
