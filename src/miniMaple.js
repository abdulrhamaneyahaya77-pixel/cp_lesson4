
class MiniMaple {
    remplacerSymboles(expr) {
        return expr
            .replace(/[²³⁴⁵⁶⁷⁸⁹]/g, m => "^" + "²³⁴⁵⁶⁷⁸⁹".indexOf(m, 0) + 2)
            .replace(/[×·]/g, "*");
    }

    parseExpression(expr) {
        expr = this.remplacerSymboles(expr);
        
    }

   
    // -------------------------------
    parseExpression(expr) {
       expr = this.remplacerSymboles(expr);
        expr = expr.replace(/\s+/g, ""); 

        const parties = expr.split(/(?=[+-])/);
        const termes = []; 

        for (let part of parties) {
            if (part.trim() === "") continue;

            const match = part.match(/^([+-]?\d*)\*?([a-zA-Z])?(?:\^([0-9]+))?$/);

            if (!match) {
                // Si c'est juste un nombre
                const num = parseFloat(part);
                if (!isNaN(num)) {
                    termes.push({
                        coefficient: num,
                        symbole: "",
                        exposant: 0
                    });
                }
                continue;
            }

            let [, coef, symbole, exposant] = match;

            coef = coef ? parseFloat(coef) : 1;
            exposant = exposant ? parseFloat(exposant) : (symbole ? 1 : 0);

            if (part.trim().startsWith("-") && coef > 0) coef = -coef;

            
            termes.push({
                coefficient: coef,
                symbole: symbole || "",
                exposant: exposant
            });
        }

        return termes;
    }

    
// -------------------------------
diff(expression, variable) {
    const termes = this.parseExpression(expression);

    const derives = termes.map(t => {
        if (t.symbole !== variable) return { coefficient: 0, symbole: "", exposant: 0 };
        if (t.exposant === 0) return { coefficient: 0, symbole: "", exposant: 0 };

        return {
            coefficient: t.coefficient * t.exposant,
            symbole: t.symbole,
            exposant: t.exposant - 1
        };
    });

    const derivesFiltrees = derives.filter(t => t.coefficient !== 0);

    const resultat = derivesFiltrees.map(t => {
        if (t.exposant === 0 || t.symbole === "") return `${t.coefficient}`;
        if (t.exposant === 1) return `${t.coefficient}*${t.symbole}`;
        return `${t.coefficient}*${t.symbole}^${t.exposant}`;
    }).join(" + ");

    return resultat.replace(/\+\s*-/g, "- ");
}
}

export { MiniMaple };
