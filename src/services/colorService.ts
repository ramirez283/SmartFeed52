export const ColorService = {
    getAverageColor: (imageUri: string): string => {
        const match = imageUri.match(/seed\/(\d+)/);
        const seed = match ? parseInt(match[1], 10) : 1;

        const hue = (seed * 137.5) % 360;
        const h = hue / 360;
        const s = 0.4;
        const l = 0.88;

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const toRgb = (t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const r = Math.round(toRgb(h + 1 / 3) * 255);
        const g = Math.round(toRgb(h) * 255);
        const b = Math.round(toRgb(h - 1 / 3) * 255);

        return `rgb(${r},${g},${b})`;
    },
};
