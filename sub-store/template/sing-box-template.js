const { type, name } = $arguments;
const compatible_outbound = {
  tag: "COMPATIBLE",
  type: "direct",
};

let compatible;
let config = JSON.parse($files[0]);
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? "collection" : "subscription",
  platform: "sing-box",
  produceType: "internal",
});

config.outbounds.push(...proxies);

config.outbounds.map((i) => {
  if (["🚀 手动切换"].includes(i.tag)) {
    i.outbounds = [
      ...getTags(proxies, /^((?!(🇨🇳|网易云|Music|shadowtls_shadowtls)).)*$/i),
      ...i.outbounds,
    ];
  }
  if (["🎯 国内直连"].includes(i.tag)) {
    i.outbounds = [
      ...getTags(
        proxies,
        /^(?!.*(百度|中国->)).*(中国|回国|国内|CN|cn|🇨🇳|China).*$/i
      ),
      ...i.outbounds,
    ];
  }
  if (["🐈 百度代理"].includes(i.tag)) {
    i.outbounds = [
      ...getTags(proxies, /^(?!.*('🇨🇳|中国|回国|国内|CN|cn|China)).*百度.*$/i),
      ...i.outbounds,
    ];
  }
});

config.outbounds.forEach((outbound) => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound);
      compatible = true;
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2);

function getTags(proxies, regex) {
  return (regex ? proxies.filter((p) => regex.test(p.tag)) : proxies).map(
    (p) => p.tag
  );
}
