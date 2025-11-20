class MiniMaple{
    constructor(){}

    static differentiate(poly,vari){
        poly = poly.replace(/\s/g, '').toLowerCase();
        vari = vari.toLowerCase()

        const terms = this.splitPoly(poly);
        const derivTerms = []

        for (const term of terms){
            const derivative = this.differentiateTerm(term, vari);
            if (derivative !== '0'){
                derivTerms.push(derivative);
            }
        }

        if (derivTerms.length === 0) {
            return '0';
        }

        return derivTerms.join('+').replace(/\+\-/g, '-');
    }

    static splitPoly(poly){
        const terms = [];
        let currTerm = '';
        let sign = 1;

        for (let i = 0; i < poly.length; i++){
            const char = poly[i];
            if (char === '+' || char === '-'){
                if (currTerm !== ''){
                    terms.push((sign === -1 ? '-' : '') + currTerm);
                    currTerm = ''
                }
                sign = char === '-' ? -1 : 1;
            }
            else{
                currTerm += char;
            }
        }

        if (currTerm !== ''){
            terms.push((sign === -1 ? '-' : '') + currTerm);
        }
        return terms;
    }

    static differentiateTerm(term, variable){
        let sign = 1;
        if (term.startsWith('+')){
            term = term.substring(1);
        } else if (term.startsWith('-')){
            sign = -1;
            term = term.substring(1);
        }

        if (!term.includes(variable)){
            return '0';
        }

        const parts = term.split('*');
        let coeff = 1;
        let power = 1;

        for (const part of parts){
            if (part.includes(variable)){
                if (part.includes('^')){
                    const exp = part.split('^')[1];
                    power = parseInt(exp);
                }
                else {power = 1;}
            }
            else {coeff *= parseFloat(part);}
        }

        coeff *= sign * power;
        power -= 1;

        if (power === 0){
            return coeff.toString();
        }
        else if (power === 1)
        {
            return coeff === 1 ? variable : coeff === 1 ? '-'+variable : coeff+'*'+variable;
        }
        else {
            return coeff === 1 ? variable+'^'+power : coeff === -1 ? '-'+variable+'^'+power : coeff+'*'+variable+'^'+power;
        }
    }
}

export {MiniMaple}