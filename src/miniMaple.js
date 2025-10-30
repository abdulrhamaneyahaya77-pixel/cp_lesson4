class MiniMaple {
    diff(expr, variable) {
        // Vérifie les caractères autorisés
        if (!/^[0-9a-zA-Z+\-*/^ ()]+$/.test(expr)) {
            throw new Error("Opération non autorisée !");
        }

        // Sépare les termes par + ou -
        const terms = expr.split(/(?=[+-])/);

        const derivedTerms = terms.map(term => this.deriveTerm(term.trim(), variable));
        // Nettoie les + et - redondants
        return derivedTerms.join(" + ").replace(/\+\s*-/g, "- ").replace(/\s+/g, " ").trim();
    }

    deriveTerm(term, variable) {
        // Si le terme ne contient pas la variable, dérivée = 0
        if (!term.includes(variable)) {
            return "0";
        }

        // Correspond à : [coefficient]*[variable]^[exposant]
        const regex = /^([0-9]*)\*?([a-zA-Z])(?:\^([0-9]+))?$/;
        const match = term.match(regex);

        if (!match) return "0";

        let [, coef, variableName, exponent] = match;
        coef = coef ? parseFloat(coef) : 1;
        exponent = exponent ? parseFloat(exponent) : 1;

        // Si la variable diffère → dérivée = 0
        if (variableName !== variable) return "0";

        // Règle : d/dx (a*x^n) = a*n*x^(n-1)
        const newCoef = coef * exponent;
        const newExp = exponent - 1;

        if (newExp === 0) return `${newCoef}`;
        if (newExp === 1) return `${newCoef}*${variable}`;
        return `${newCoef}*${variable}^${newExp}`;
    }
}

export { MiniMaple };
