/* ======================================================================
   琉光塔罗 · 站点配置文件（可直接修改，无需构建）
   ----------------------------------------------------------------------
   deepseekKey : DeepSeek API Key。填入后，所有访客打开「解读」都会自动
                 接入 AI 生成整体解读，无需手动填写。
   deepseekUrl : 可选，自定义接口地址（例如你自己的反向代理，推荐用于
                 公开部署时隐藏真实 Key）。
   注意：这是纯静态站点，Key 会出现在页面源码中，仅建议在个人/私有
        项目或自有代理下使用。
   ====================================================================== */
function decode(b64){ try{ return atob(b64); }catch(e){ return ""; } }

window.TAROT_CONFIG = {
  deepseekKey: decode("c2stM2RjZGY2M2JhMGFmNGQwYjk4NzA0ZjRiNjZhYmM2NzQ="),   /* DeepSeek API Key（已内置，访客无需填写） */
  deepseekUrl: ""                  /* ← 可选：代理地址，如 https://your-proxy.example.com/chat */
};
