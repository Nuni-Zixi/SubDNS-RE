# RESKIN_NOTES — Fork 改皮记录（subdns.cc 风格）

> 源仓库：https://github.com/prince-m2hgamerz/subdns （MIT，Next.js 16 + React 19 + Tailwind v4 + PostgreSQL/Supabase + Cloudflare API）
> 本地克隆：`~/workspace/subdns-reskin`（仅本地 clone，**没有**创建 GitHub 远程 fork、没有 push）
> 日期：2026-11-10
> 文案原则：只学 subdns.cc 的风格与功能布局，落地页文案为原创；仅保留 A / AAAA / CNAME / TXT / MX 等事实性短语。

---

## 1. 审计结果（改皮前）

| 问题 | 结论 |
|---|---|
| 落地页在哪 | 路由 `src/app/page.tsx`（原版组合了 Navbar/Hero/WhySubDNS/Features/TerminalDemo/RecentlyShipped/Stats/EmailCapture/SocialProof/Footer）；组件在 `src/components/landing/`（hero.tsx、features.tsx、faq.tsx、navbar.tsx、footer.tsx、why-subdns.tsx 等） |
| 全局布局/SEO | `src/app/layout.tsx`（metadata、JSON-LD、语言）；`src/app/globals.css` 是深色主题（`--color-background:#000` 等，Vercel 风） |
| 主题机制 | `src/components/theme-provider.tsx` 默认 `dark`；改皮采用「落地页自带浅色配色」的方式，不动全局主题，避免破坏后台/控制台的深色样式 |
| 免费子域名上限写在哪 | **核心：`src/lib/plans.ts` 的 BRONZE 套餐 `maxSubdomains: 10`**；另有运行时覆盖：`src/lib/settings-store.ts` 的 `defaultSubdomainLimit: "10"`（DB app_settings 优先），被 `src/app/api/subdomains/route.ts` 读取做校验（`>= limit` 返回 429）。种子/默认值还散落在 `data/settings.json`、`data/migrations/001_create_app_settings.sql`、`src/app/api/admin/settings/route.ts`（兜底 `"10"` ×2）、`src/app/admin/settings/page.tsx`（初始值 10） |
| 每域名记录数上限写在哪 | **有，且本来就是按子域名计的**：`src/lib/plans.ts` BRONZE `maxDnsRecords: 50`；`src/app/api/dns/route.ts` 按 `subdomain_id` 计数，`>= plan.maxDnsRecords` 返回 429。所以改 BRONZE 的 50 → 8 即实现「每域名最多 8 条」，无需新写校验层 |
| 品牌名出现在哪 | `SubDNS` 在 src 内约 319 处；`m2hio` 约 191 处、分布在约 50 个文件（layout、legal、docs、dashboard、invoice、lib/blog.ts、lib/ai-knowledge.json 等）。本次只替换**落地页 + layout 元数据**的品牌露出；全站品牌替换属于上线前工作（见 §5 清单） |
| 其它文案里的旧额度 | `src/components/landing/faq.tsx`「10 subdomains and 50 DNS records」、`src/app/faq/page.tsx`「up to 25 subdomains」（原版自相矛盾）均已对齐为 2 / 8 |
| 未改的一项（有意保留） | `src/lib/abuse-detection.ts` 里「1 小时内创建 ≥10 个」的**滥用速度信号**不是额度，而是防刷阈值。若降到 2，正常用户领满 2 个就会被误报，故保留并在此说明 |

## 2. 改了哪些文件

### 落地页换皮（浅色编辑风）
- `src/app/page.tsx` — **整体重写**为自包含落地页：米白纸色背景 `#faf7f1`、深墨文字 `#211d16`、衬线大标题（font-serif）、编号小节 01/02/03/04、细线分隔。内容：主标题「给项目一个安静的门牌号」；卖点数据（2 个/账户、8 条/域名、0 元）；01 能做什么（领取即用 / 五种记录 / 可开 Cloudflare 代理 / 随时可改可删 / 免费额度）；02 怎么用三步（注册账户 → 领取前缀 → 填一条解析）；03 规则；04 FAQ；底部领取 CTA。自带浅色 header/footer，不再引用原深色 landing 组件（原组件文件保留未删，方便对照/回滚）。
- `src/app/layout.tsx` — 标题/描述/OG 改中文，`lang="zh-CN"`，metadataBase/canonical 改为占位 `https://www.your-domain.cc`，清除该文件内全部 `m2hio.in`。
- `preview/index.html` — 与改后落地页内容一致的独立静态预览（纯 HTML/CSS，无需构建即可打开看效果）。

### 额度规则（10 → 2，每域名 50 → 8）
| 文件 | 改动 |
|---|---|
| `src/lib/plans.ts` | BRONZE `maxSubdomains: 10 → 2`、`maxDnsRecords: 50 → 8`；features 文案 `Up to 10 subdomains → Up to 2 subdomains`、`50 DNS records → 8 DNS records per subdomain` |
| `src/lib/settings-store.ts` | `defaultSubdomainLimit: "10" → "2"`（代码默认值） |
| `src/app/api/subdomains/route.ts` | 无需改代码：它读 `defaultSubdomainLimit ?? plan.maxSubdomains`，两处来源都已是 2，校验逻辑自动生效 |
| `src/app/api/dns/route.ts` | 无需改代码：它读 `plan.maxDnsRecords`，已随 plans.ts 变为 8（按 subdomain_id 计数） |
| `data/settings.json` | `defaultSubdomainLimit "10" → "2"` |
| `data/migrations/001_create_app_settings.sql` | 种子值 `'10' → '2'` |
| `src/app/api/admin/settings/route.ts` | 两处兜底 `?? "10" → ?? "2"` |
| `src/app/admin/settings/page.tsx` | 初始状态 `defaultSubdomainLimit: 10 → 2` |
| `src/components/landing/faq.tsx` | 文案改为 2 subdomains / 8 DNS records per subdomain |
| `src/app/faq/page.tsx` | 文案 `up to 25 → up to 2` |

### 占位符
- `.env.example`：`APP_DOMAIN="m2hio.in" → "your-domain.cc"`。
- **待用户确定根域名后全局替换的位置**：`src/app/page.tsx` 的 `ROOT_DOMAIN` 常量、`src/app/layout.tsx` 的 `www.your-domain.cc`、`preview/index.html` 里的 `your-domain.cc`、`.env.example` 的 `APP_DOMAIN` / `NEXTAUTH_URL` 等，以及 §5 的全站 `m2hio.in` 残留（约 50 个文件，主要是 docs/legal/dashboard 文案与示例）。**不要把 devs.li 当根域名**（未确认其 Zone 归属）。

## 3. 验证结果（2026-11-10，本机实测）

| 步骤 | 结果 |
|---|---|
| `npm install --ignore-scripts` | ✅ 成功，711 个包，约 32 秒（Node v24.22.1）。注：安装时 package-lock.json 被 npm 改动，已 `git checkout` 还原 |
| `npx tsc --noEmit` | ✅ 通过，退出码 0 |
| `npx next dev -p 3107` + curl 首页 | ✅ **HTTP 200**，56,515 字节；抓到的 HTML 含「给项目一个 / 安静的门牌号」「2 个 / 账户」「最多 8 条」、`your-domain.cc` 出现 26 次。验证后已停掉 dev 进程 |
| `npx next build` | ⚠️ **编译与类型检查都通过**（Compiled successfully 40s + TypeScript 15.2s），但在 Collecting page data 阶段失败：`Error: Missing SUPABASE_URL`。原因：API 路由模块加载时强依赖 Supabase 环境变量，本次按约束没有连接任何真实数据库/密钥，所以完整生产构建要等配好 Supabase 后才能跑通。**没有假装构建成功** |
| 备注 | 按仓库 `AGENTS.md` 要求，写代码前已在装好依赖后查阅 `node_modules/next/dist/docs/01-app/`：新落地页就是标准的 `app/page.tsx` 默认导出组件，无废弃 API。另：dev 日志提示原仓库的 `middleware` 文件约定已被 Next 16 标记 deprecated（原版问题，非本次改动引入） |

验证用的 `.env.local`（从 .env.example 复制）已在验证后删除，未连接 Cloudflare / 数据库，未填任何真实密钥。
注意：上游 `.env.example` 里带有原作者的邮箱等信息，正式部署前应整份换成自己的值，不要直接沿用。

## 4. 还缺什么才能上线

1. **根域名**：用户确定一个完全掌控、可把 NS 切到 Cloudflare 的根域名，然后按 §2 清单全局替换 `your-domain.cc`，并清理全站残留的 `m2hio.in` / 原品牌文案（docs、legal、blog、ai-knowledge 等大文件需单独过一遍）。
2. **Cloudflare**：账号 + 该根域名的 Zone；一枚只有该 Zone DNS 编辑权限的 API Token（通过安全录入提供，不要贴聊天明文）；把 Zone ID 等填入部署环境变量（原版变量名：`CLOUDFLARE_API_EMAIL` / `CLOUDFLARE_API_KEY` / `CLOUDFLARE_ZONE_ID`，原版用的是 Global API Key 方式，正式上线建议评估能否换成Scoped Token）。
3. **数据库**：PostgreSQL / Supabase 项目（`DATABASE_URL`、`SUPABASE_URL`、service role / anon key），并执行仓库的 supabase / data migrations 建表与种子（种子里的默认额度已是 2）。
4. **其它环境变量**：`NEXTAUTH_URL` / `NEXTAUTH_SECRET`、登录方式（Google/GitHub OAuth 或邮箱）、邮件发送（Resend/Supabase Edge Function）、可选的 Upstash Redis。清单以 `.env.example` 为准。
5. **部署**：Vercel 导入该仓库（根目录有 `vercel.json`），或按 `Dockerfile` / `docker-compose.yml` 自托管；土耳其那台 1G 小机器不适合跑 Next.js + 数据库全家桶，建议先 Vercel + Supabase 免费档。
6. **上线前收尾**：管理员账号与保留词/滥用规则确认；SILVER/GOLD 付费套餐（plans.ts 里仍是原版 ₹ 定价与 50/250 额度）要么隐藏要么重定价；支付（Cashfree 是印度通道）与国内支付不匹配，一期建议只做免费 + 管理员手动加额度。

## 5. 当前状态一句话

落地页已换成 subdns.cc 式的浅色中文编辑风、免费额度已全链路改成 2 个/8 条、类型检查与 dev 渲染实测通过；卡在根域名、Cloudflare Token、Supabase 三样用户侧输入，齐了就能接真 DNS 并部署。
