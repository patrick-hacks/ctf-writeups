async function decode(e) {
    const t = i.e.map((e => e.toString(16).padStart(8, "0"))).join("")
        , a = new Uint8Array(atob(e).split("").map((e => e.charCodeAt(0))))
        , n = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        , r = (new TextEncoder).encode(t)
        , c = await crypto.subtle.importKey("raw", r, {
            name: "AES-GCM"
        }, !1, ["decrypt"])
        , o = await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: n
        }, c, a);
    return (new TextDecoder).decode(o)
} //(n).then((e => i.l = e))

i = {}
i.e = [40645774,
    130661539,
    116339703,
    150379278]

decode("Dugd8DbBCXnrEF1kKd2Hg4lsRQ1eV/6gQ+NfwsVhtr4UgeXQFq1m6WctmIljEG7PZg==").then(e => console.log(e))
