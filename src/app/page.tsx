import Link from "next/link";

/**
 * Reskin: 浅色编辑排版风落地页（占位品牌「门牌号」/ SubDNS 中文站）
 * 根域名为占位符 your-domain.cc，确定正式域名后全局替换，见 RESKIN_NOTES.md。
 * 文案为原创，仅保留 A / AAAA / CNAME / TXT / MX 等事实性信息。
 */
const ROOT_DOMAIN = "your-domain.cc";

const features = [
  {
    no: "01",
    title: "领取即用",
    body: "输入想要的前缀，实时查重。没被占用就能领下，先放进「我的域名」，再慢慢配解析。",
  },
  {
    no: "02",
    title: "五种记录",
    body: "A、AAAA、CNAME、TXT、MX 都能填，可以改主机记录和 TTL，每个域名最多 8 条。",
  },
  {
    no: "03",
    title: "可开 Cloudflare 代理",
    body: "打开代理后，子域名走 Cloudflare 网络并自动用上 HTTPS；指向 Vercel、Netlify 等平台时，也可以用它们签发的证书。",
  },
  {
    no: "04",
    title: "随时可改可删",
    body: "解析填错了就改，不想要了就删。删除子域名时，对应的 DNS 记录会一并清理。",
  },
  {
    no: "05",
    title: "免费额度",
    body: "每个账户默认 2 个免费子域名，长期有效。不绑卡，也没有自动续费。",
  },
];

const steps = [
  { no: "01", title: "注册账户", body: "用邮箱收一个验证码，设置密码。已有账号可以直接登录。" },
  { no: "02", title: "领取前缀", body: `选一个没被占用的前缀，比如 studio，你会得到 studio.${ROOT_DOMAIN}。` },
  { no: "03", title: "填一条解析", body: "选记录类型、填目标地址、保存。通常约 1 分钟内生效。" },
];

const rules: Array<[string, string]> = [
  ["免费额度", "每个新账户 2 个子域名"],
  ["解析条数", "每个域名最多 8 条"],
  ["记录类型", "A / AAAA / CNAME / TXT / MX"],
  ["生效时间", "保存后约 1 分钟"],
  ["费用", "0 元，不需要绑定支付方式"],
  ["使用限制", "不能用于钓鱼、诈骗、侵权或违反法律的内容"],
];

const faqs: Array<[string, string]> = [
  ["真的免费吗？", "是。2 个子域名长期免费，解析修改也不收费。"],
  ["能用来做什么？", "个人主页、博客、文档站、演示环境、小型 API 都可以。把 CNAME 指向 Vercel、Netlify、Cloudflare Pages、GitHub Pages，或者用 A / AAAA 指向自己的服务器。"],
  ["修改后多久生效？", "通常约 1 分钟。TTL 默认自动，最低 60 秒。"],
  ["可以绑定自己的域名吗？", `目前只提供 ${ROOT_DOMAIN} 下的子域名，暂不支持绑定其他根域名。`],
  ["违规使用会怎样？", "域名会被停用或删除，账户也可能被封禁。请只用于合法、正常的项目。"],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f1] font-sans text-[#211d16] antialiased">
      <header className="border-b border-[#e3ddd0]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-sm font-semibold tracking-wide">
            门牌号 <span className="font-normal text-[#8a8172]">· SubDNS</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm text-[#6f6656]">
            <a href="#features" className="hover:text-[#211d16]">能做什么</a>
            <a href="#steps" className="hover:text-[#211d16]">怎么用</a>
            <a href="#faq" className="hover:text-[#211d16]">问答</a>
            <Link href="/auth/register" className="border border-[#211d16] px-3 py-1.5 text-[#211d16] hover:bg-[#211d16] hover:text-[#faf7f1]">
              注册
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        <section className="py-16 sm:py-20">
          <p className="text-xs tracking-[0.25em] text-[#8a8172]">NO. 01 — 免费子域名，长期可用</p>
          <h1 className="mt-6 font-serif text-4xl leading-snug sm:text-5xl sm:leading-snug">
            给项目一个<br />安静的门牌号。
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-[#554d3f]">
            注册后可以领取两个 <span className="font-mono text-sm">{ROOT_DOMAIN}</span> 子域名。
            填一条解析，就能把博客、作品集或一个小 API，放到一个记得住的地址上。
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-[#e3ddd0] py-5 text-sm">
            <div><dt className="text-[#8a8172]">免费额度</dt><dd className="mt-1 font-medium">2 个 / 账户</dd></div>
            <div><dt className="text-[#8a8172]">解析记录</dt><dd className="mt-1 font-medium">最多 8 条 / 域名</dd></div>
            <div><dt className="text-[#8a8172]">费用</dt><dd className="mt-1 font-medium">0 元</dd></div>
          </dl>
          <p className="mt-4 text-sm text-[#8a8172]">适合放：个人主页 · 博客 · 文档站 · 演示环境 · 小型 API · 图床</p>
          <div className="mt-8">
            <Link href="/auth/register" className="inline-block bg-[#211d16] px-5 py-2.5 text-sm text-[#faf7f1] hover:bg-[#3a342a]">
              领取一个 →
            </Link>
          </div>
        </section>

        <section id="features" className="border-t border-[#e3ddd0] py-14">
          <p className="text-xs tracking-[0.25em] text-[#8a8172]">01 / 能做什么</p>
          <h2 className="mt-4 font-serif text-2xl">不复杂，但不凑合。</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#554d3f]">这里只做几件事：把子域名领给你，把解析写进 DNS，让地址能打开。</p>
          <div className="mt-8">
            {features.map((f) => (
              <article key={f.no} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-[#e3ddd0] py-5">
                <span className="font-mono text-sm text-[#8a8172]">{f.no}</span>
                <div>
                  <h3 className="font-medium">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#554d3f]">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="steps" className="border-t border-[#e3ddd0] py-14">
          <p className="text-xs tracking-[0.25em] text-[#8a8172]">02 / 怎么用</p>
          <h2 className="mt-4 font-serif text-2xl">三步，写一条记录。</h2>
          <p className="mt-3 text-sm text-[#554d3f]">不用装客户端，也不用等审核。</p>
          <div className="mt-8">
            {steps.map((s) => (
              <article key={s.no} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-[#e3ddd0] py-5">
                <span className="font-mono text-sm text-[#8a8172]">{s.no}</span>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#554d3f]">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-[#8a8172]">例：CNAME → cname.vercel-dns.com</p>
        </section>

        <section className="border-t border-[#e3ddd0] py-14">
          <p className="text-xs tracking-[0.25em] text-[#8a8172]">03 / 规则</p>
          <h2 className="mt-4 font-serif text-2xl">就这些。</h2>
          <p className="mt-3 text-sm text-[#554d3f]">没有积分，没有签到，也没有需要研究的套餐。</p>
          <dl className="mt-8">
            {rules.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-2 border-t border-[#e3ddd0] py-3.5 text-sm">
                <dt className="text-[#8a8172]">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="faq" className="border-t border-[#e3ddd0] py-14">
          <p className="text-xs tracking-[0.25em] text-[#8a8172]">04 / 问答</p>
          <h2 className="mt-4 font-serif text-2xl">常见问题。</h2>
          <div className="mt-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-t border-[#e3ddd0] py-4">
                <summary className="cursor-pointer text-sm font-medium">{q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-[#554d3f]">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e3ddd0] py-14 text-center">
          <h2 className="font-serif text-2xl">先领一个，再慢慢想名字。</h2>
          <p className="mt-3 text-sm text-[#554d3f]">注册需要一分钟，2 个名额即时到账。</p>
          <Link href="/auth/register" className="mt-6 inline-block bg-[#211d16] px-5 py-2.5 text-sm text-[#faf7f1] hover:bg-[#3a342a]">
            去注册 →
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#e3ddd0]">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-[#8a8172]">
          <span>门牌号 · SubDNS — 免费子域名（占位品牌，待正式命名）</span>
          <span className="font-mono">*.{ROOT_DOMAIN}</span>
        </div>
      </footer>
    </div>
  );
}
