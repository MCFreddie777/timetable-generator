const colorPool = [
    'rgb(93,150,240)',
    'rgb(111,179,82)',
    'rgb(124,82,233)',
    'rgb(201,61,87)',
    'rgb(228,129,39)',
    'rgb(242,170,80)',
    'rgb(136,19,144)',
    'rgb(124,82,233)',
    'rgb(206,127,247)',
    'rgb(201,61,87)',
];

export function getColor(index = undefined) {
    const randomIndex = (Math.random() * colorPool.length) | 0;
    const selectedColor = colorPool.splice(index ?? randomIndex, 1)[0];
    return selectedColor ?? colorForIndex((Math.random() * 100) | 0);
}

export function colorForIndex(i, asString = true) {
    const values = HSVToRGB((i * 0.618033988749895) % 1.0, 0.5, Math.sqrt(1.0 - ((i * 0.618033988749895) % 0.5)));

    return asString ? `rgb(${values[0]}, ${values[1]}, ${values[2]})` : values;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
}

function HSVToRGB(h, s, v) {
    if (s === 0) {
        return [v, v, v];
    }
    if (v === 0) {
        return [0, 0, 0];
    }
    const col = [0, 0, 0];
    const hval = h * 6;
    const sel = Math.floor(hval);
    const mod = hval - sel;
    const v1 = v * (1 - s);
    const v2 = v * (1 - s * mod);
    const v3 = v * (1 - s * (1 - mod));

    switch (sel + 1) {
        case 0:
            col[0] = v;
            col[1] = v1;
            col[2] = v2;
            break;
        case 1:
            col[0] = v;
            col[1] = v3;
            col[2] = v1;
            break;
        case 2:
            col[0] = v2;
            col[1] = v;
            col[2] = v1;
            break;
        case 3:
            col[0] = v1;
            col[1] = v;
            col[2] = v3;
            break;
        case 4:
            col[0] = v1;
            col[1] = v2;
            col[2] = v;
            break;
        case 5:
            col[0] = v3;
            col[1] = v1;
            col[2] = v;
            break;
        case 6:
            col[0] = v;
            col[1] = v1;
            col[2] = v2;
            break;
        case 7:
            col[0] = v;
            col[1] = v3;
            col[2] = v1;
            break;
    }

    col[0] = Math.floor(clamp(col[0], 0, 1) * 255);
    col[1] = Math.floor(clamp(col[1], 0, 1) * 255);
    col[2] = Math.floor(clamp(col[2], 0, 1) * 255);
    return col;
}
