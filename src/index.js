import { MiniMaple } from "./miniMaple.js";

document.addEventListener("DOMContentLoaded", () => {
    const m = new MiniMaple();

    document.getElementById("deriveButton").onclick = () => {
        const expr = document.getElementById("expr").value;
        const variable = document.getElementById("variable").value;
        const resultDiv = document.getElementById("result");

        try {
            const result = m.diff(expr, variable);
            resultDiv.innerText = `Résultat : ${result}`;
            resultDiv.style.color = "green";
        } catch (err) {
            resultDiv.innerText = `Erreur : ${err.message}`;
            resultDiv.style.color = "red";
        }
    };
});
