a = [
    [
        [
            -0.035712653158569425,
            -0.03287257405769594,
            0.02334270751557671,
            -0.02540569009549741
        ],
        [
            0.006411543162643718,
            0.02983176158440242,
            0.02174280291361509,
            0.0067315240830360425
        ],
        [
            -0.010545458159016606,
            -0.00814858244477348,
            -0.042581311921773606,
            0.020546352515626396
        ],
        [
            -0.033596009182061196,
            -0.000705547992169411,
            0.02680088640677326,
            -0.051391718257793324
        ]
    ],
    [
        [
            0.17638922081966382,
            0.09011377379943657,
            -0.2507513705723452,
            -0.14779730737755375
        ],
        [
            0.055901970582484195,
            0.015708171290764118,
            -0.08718795489603928,
            -0.034523214634888215
        ],
        [
            -0.08558020292437048,
            -0.07923610054967736,
            0.17700480152953701,
            0.08977339387750669
        ],
        [
            -0.1294747286013282,
            -0.05801667137404857,
            0.20491595512778732,
            0.13903433491935893
        ]
    ],
    [
        [
            -1.4436222005842259,
            0.33729308666017527,
            0.5668938656280429,
            -1.2835443037974683
        ],
        [
            5.040019474196689,
            -1.136222005842259,
            -1.895520934761441,
            4.410126582278481
        ],
        [
            2.833203505355404,
            -0.6585199610516066,
            -1.0631937682570594,
            2.4658227848101264
        ],
        [
            -1.0833495618305744,
            0.23018500486854918,
            0.4296007789678676,
            -0.9417721518987342
        ]
    ],
    [
        [
            -0.30391992395012024,
            0.37225297768830734,
            0.10770005032712632,
            0.18833529049935693
        ],
        [
            0.2496784655818375,
            -0.27545713806408323,
            -0.055359838953195774,
            -0.15288262595761337
        ],
        [
            -0.027456243359615277,
            0.10879047139741654,
            0.055359838953195774,
            0.09732707040205782
        ],
        [
            0.20058155790415477,
            -0.2713470894145278,
            -0.11726220432813286,
            -0.1713079460940558
        ]
    ]
]

function test() {
    return (e = [...Array(4).keys()].map((e=>i.i.slice(4 * e, 4 * e + 4))),
                  t = a[i.b],
                  e.map((e=>t[0].map(((e,a)=>t.map((e=>e[a])))).map((t=>e.map(((a,n)=>e[n] * t[n])).reduce(((e,t)=>e + t))))))).flatMap((e=>e)).map((e=>Math.round(100 * e) / 100)).map(((e,t)=>1 === e ? t + 1 : e))
}

function solve_part(part) {
    start_i = part * 4
    win = [1, 6, 11, 16]
    for (let i1 = 0; i1<64; i1++) {
        i.i[start_i] = -32 + i1;
        for (let i2 = 0; i2<64; i2++) {
            i.i[start_i + 1] = -32 + i2;
            for (let i3 = 0; i3<64; i3++) {
                i.i[start_i + 2] = -32 + i3;
                for (let i4 = 0; i4<64; i4++) {
                    i.i[start_i + 3] = -32 + i4;
                    res = test()
                    res_short = res.filter((e=>e))
                    if (res_short.length == 16 - (part * 3) - 3 && res_short[start_i/4] == win[start_i/4]) {
                        console.log(i.i.slice(part*4, (part+1)*4))
                        return
                    }
                }
            }
        }
    }
}

i = {}
// level
i.b = 3
i.i = new Array(16).fill(30)
solve_part(0)
solve_part(1)
solve_part(2)
solve_part(3)
