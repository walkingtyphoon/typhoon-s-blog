// 理工风渐变波浪 — 外部文件，更易维护
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("background-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0, height = 0, time = 0;
    let colors = getColors();

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function getColors() {
        const cs = getComputedStyle(document.documentElement);
        return {
            gradTop: cs.getPropertyValue("--bg-grad-top").trim() || "#07070a",
            gradBottom: cs.getPropertyValue("--bg-grad-bottom").trim() || "#0f1120",
            fill1: cs.getPropertyValue("--wave-fill-1").trim() || "rgba(0,120,160,0.06)",
            fill2: cs.getPropertyValue("--wave-fill-2").trim() || "rgba(0,120,160,0.14)",
            stroke: cs.getPropertyValue("--wave-stroke").trim() || "rgba(0,190,255,0.8)"
        };
    }

    const observer = new MutationObserver(() => { colors = getColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    function waveY(x, t, speed=1.0) {
        return Math.sin(x * 0.008 + t * 0.9 * speed) * 42
            + Math.sin(x * 0.02 - t * 1.6 * speed) * 18;
    }

    function render() {
        time += 0.016;
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, colors.gradTop);
        g.addColorStop(1, colors.gradBottom);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        // multi-layer waves
        const layers = [
            {fill: colors.fill1, offset:0, speed:0.45, stroke: false},
            {fill: colors.fill2, offset:40, speed:0.9, stroke: false},
            {stroke: colors.stroke, offset:0, speed:1.2, stroke:true}
        ];

        layers.forEach((L, idx) => {
            ctx.beginPath();
            const step = 6;
            for (let x = 0; x <= width; x += step) {
                const y = height * 0.52 + waveY(x + (idx*30), time, L.speed) + L.offset;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            if (L.stroke) {
                ctx.strokeStyle = L.stroke;
                ctx.lineWidth = 1.6;
                ctx.stroke();
            } else {
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fillStyle = L.fill;
                ctx.fill();
            }
        });

        requestAnimationFrame(render);
    }

    render();
});
