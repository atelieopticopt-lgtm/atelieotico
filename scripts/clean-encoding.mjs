import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes("node_modules") && !fullPath.includes(".git") && !fullPath.includes("dist")) {
        results = results.concat(walk(fullPath));
      }
    } else if (fullPath.endsWith(".astro") || fullPath.endsWith(".ts") || fullPath.endsWith(".js") || fullPath.endsWith(".css")) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk("./src");

for (const f of files) {
  let content = fs.readFileSync(f, "utf8");
  let modified = false;

  const fixMap = [
    { from: /Ateli[^\s<"']+\s*"tico/gi, to: "Ateliê Ótico" },
    { from: /Ateli[^\s<"']+/gi, to: "Ateliê" },
    { from: /Cat[^\s<"']+logo/gi, to: "Catálogo" },
    { from: /cat[^\s<"']+logo/gi, to: "catálogo" },
    { from: /Cole[^\s<"']+o/gi, to: "Coleção" },
    { from: /cole[^\s<"']+o/gi, to: "coleção" },
    { from: /Cole[^\s<"']+es/gi, to: "Coleções" },
    { from: /cole[^\s<"']+es/gi, to: "coleções" },
    { from: /arma[^\s<"']+o/gi, to: "armação" },
    { from: /Arma[^\s<"']+o/gi, to: "Armação" },
    { from: /precis[^\s<"']+o/gi, to: "precisão" },
    { from: /Precis[^\s<"']+o/gi, to: "Precisão" },
    { from: /Tamb[^\s<"']+m/gi, to: "Também" },
    { from: /tamb[^\s<"']+m/gi, to: "também" },
    { from: /poder[^\s<"']+/gi, to: "poderá" },
    { from: /t[^\s<"']+cnico/gi, to: "técnico" },
    { from: /t[^\s<"']+cnica/gi, to: "técnica" },
    { from: /excel[^\s<"']+ncia/gi, to: "excelência" },
    { from: /experi[^\s<"']+ncia/gi, to: "experiência" },
    { from: /est[^\s<"']+tico/gi, to: "estético" },
    { from: /est[^\s<"']+tica/gi, to: "estética" },
    { from: /Sess[^\s<"']+es/gi, to: "Sessões" },
    { from: /sess[^\s<"']+es/gi, to: "sessões" },
    { from: /espa[^\s<"']+o/gi, to: "espaço" },
    { from: /espa[^\s<"']+os/gi, to: "espaços" },
    { from: /"culos/gi, to: "Óculos" },
    { from: /\?\?culos/gi, to: "Óculos" },
    { from: /mat\?rias/gi, to: "matérias" },
    { from: /Arma\?\?es\s*\?ticas/gi, to: "Armações óticas" },
    { from: /Arma\?\?es/gi, to: "Armações" },
    { from: /\?ticas/gi, to: "óticas" },
    { from: /\?tico/gi, to: "ótico" },
    { from: /(\d+)\s*\?/g, to: "$1 €" }
  ];

  for (const { from, to } of fixMap) {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(f, content, "utf8");
    console.log(`Cleaned: ${f}`);
  }
}
console.log("Encoding cleanup complete!");
