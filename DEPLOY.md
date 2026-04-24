# GitHub + Netlify 自动部署（推荐）

## 一次性配置

1. 在 GitHub 新建仓库（空仓库，不要勾选 README）
2. 在本项目根目录执行：

```bash
git add .
git commit -m "chore: init mvp"
git remote add origin https://github.com/mengjuanxie77-tech/agent-learning-mvp.git
git push -u origin main
```

3. 打开 Netlify：
   - `Add new site` -> `Import an existing project`
   - 选择 GitHub，选中 `agent-learning-mvp`
   - Build command：`npm run build`
   - Publish directory：`dist`
   - 点击 Deploy

`netlify.toml` 已在项目内配置好，后续一般不需要手改部署参数。

## 日常更新（之后只要这三步）

```bash
git add .
git commit -m "feat: your update"
git push
```

Push 后 Netlify 会自动构建并上线。

## 常见问题

- 路由 404：项目已包含 `_redirects` 和 `netlify.toml` 的 SPA 重写。
- 本地正常线上空白：先看 Netlify 的 Deploy log 是否 build 成功，再看浏览器控制台是否有 JS 报错。
