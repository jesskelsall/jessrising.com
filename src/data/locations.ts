import { LocationHierarchy } from "../types/location";

/**
 * Gallery photo tests will fail on locations not defined here
 * Locations tests will fail if all locations aren't unique
 * Nesting expresses hierarchy
 */
export const locationHierarchy: LocationHierarchy = {
  "🇬🇧 United Kingdom": {
    "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England": {
      "🗺️ County Durham": {
        "🏙️ Durham": {
          "Durham Cathedral": {},
        },
        Home: {},
        "Raby Castle": {},
      },
      "🗺️ Cumbria": {
        "🏞️ Lake District": {
          "Birker Fell": {},
          "Borrowdale Fells": {
            Seathwaite: {
              "Base Brown": {},
              "Sty Head": {},
            },
          },
          Buttermere: {
            "Buttermere Fell": {
              Haystacks: {},
              "High Crag": {},
              "High Stile": {},
              "Scarth Gap Pass": {},
            },
          },
          "Coniston Water": {
            Coniston: {
              "Yew Tree Farm": {},
            },
          },
          "Copeland Forest": {
            Buckbarrow: {},
            "Dore Head": {},
            "Middle Fell": {},
          },
          "Crummock Water": {
            "Brackenthwaite Fell": {
              "Crag Hill": {},
              Grasmoor: {},
              "Hopegill Head": {},
              Whiteside: {},
            },
            Mellbreak: {},
            "Rannerdale Knotts": {},
            "Scale Beck": {},
          },
          "Derwent Water": {
            "Derwent Fells": {
              "Ard Crags": {},
              Barrow: {},
              "Cat Bells": {},
              "Dale Head": {},
              "Grisedale Pike": {},
              "Knott Rigg": {},
              "Maiden Moor": {},
              Robinson: {},
              Sail: {},
            },
            Newlands: {},
          },
          "Ennerdale Water": {
            "Ennerdale Fell": {
              "Caw Fell": {},
              "Scoat Fell": {},
              Steeple: {},
            },
            "Ennerdale Forest": {},
            "Gale Fell": {
              "Great Borne": {},
              Herdus: {},
            },
          },
          Fleetwith: {
            Brandreth: {},
            "Fleetwith Pike": {},
            "Grey Knotts": {},
          },
          Keswick: {},
          Loweswater: {
            Fellbarrow: {},
            "Holme Wood": {},
            "Low Fell": {},
            "Loweswater Fell": {
              "Burnbank Fell": {},
              "Hen Comb": {},
            },
          },
          "River Esk": {},
          Rydal: {
            "Rydal Cave": {},
          },
          Ullswater: {
            "Aira Force": {},
          },
          "Wast Water": {
            "Wasdale Head": {
              "Great Gable": {},
              Mosedale: {
                Pillar: {},
              },
            },
            Yewbarrow: {},
          },
        },
        Shap: {},
      },
      "🗺️ Devon": {
        Seaton: {},
      },
      "🗺️ Tyne & Wear": {
        "🏙️ Newcastle": {
          "Newcastle Cathedral": {},
        },
        "Penshaw Monument": {},
      },
      "🗺️ Northumberland": {
        Cragside: {},
        "Dunstanburgh Castle": {},
        Seahouses: {},
      },
      "🗺️ Yorkshire": {
        Knaresborough: {},
        "🏞️ North York Moors": {
          Whitby: {},
        },
        "🏙️ Ripon": {
          "Fountains Abbey": {},
          "Ripon Cathedral": {},
        },
        "Scotch Corner": {},
        "🏙️ York": {
          "Clifford's Tower": {},
          "National Railway Museum": {},
        },
        "🏞️ Yorkshire Dales": {
          "Blea Moor": {},
          Clapham: {},
          "Howgill Fells": {},
          Ingleborough: {
            "Gaping Gill": {},
          },
          "Ribblehead Viaduct": {},
          Whernside: {},
          "White Scar Cave": {},
        },
      },
    },
    "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland": {
      "🗺️ Aberdeenshire": {
        Crovie: {},
        "Rattray Head": {},
      },
      "🗺️ Argyll & Bute": {
        Cowal: {
          "Puck's Glen": {},
        },
        "Isle of Bute": {
          Kerrycroy: {},
          "Kyles of Bute": {},
          "Mount Stuart": {},
          Rothesay: {
            "Ardencraig Gardens": {},
          },
        },
        "Isle of Mull": {
          "Calgary Bay": {},
          Fionnphort: {},
          "Isle of Iona": {
            "Iona Abbey": {},
          },
          "Isle of Staffa": {},
          Lochbuie: {},
          "Loch Spelve": {},
          "Sound of Mull": {},
          Tobermory: {},
          "Treshnish Isles": {
            "Isle of Lunga": {},
          },
        },
        "Loch Awe": {
          "Kilchurn Castle": {},
          "St Conan's Kirk": {},
        },
        Oban: {
          "Firth of Lorn": {},
          "McCaig's Tower": {},
        },
      },
      "🏞️ Cairngorms": {
        "Abernethy Forest": {
          "Loch Mallachie": {},
        },
        Balmoral: {},
        "Cairngorm Mountains": {},
        Dalwhinnie: {
          "Loch Ericht": {},
        },
        "Loch Morlich": {},
        "Loch Vaa": {},
        "Muir of Dinnet": {},
        Rothiemurchus: {},
        Tomintoul: {},
      },
      "🗺️ Highlands": {
        Ardnamurchan: {
          "Point of Ardnamurchan": {},
        },
        "🏞️ Assynt-Coigach": {
          Clashnessie: {},
          Inchnadamph: {},
          Kylesku: {},
          "Glencanisp Forest": {
            Suilven: {},
          },
          "Loch Assynt": {
            "Ardvreck Castle": {},
          },
          Lochinver: {},
          "Stac Pollaidh": {},
        },
        "🏞️ Ben Nevis & Glen Coe": {
          "Fort William": {},
          "Glen Coe": {
            "Kingshouse Hotel": {},
            Lagangarbh: {},
            "Loch Achtriochtan": {},
            "Meeting of Three Waters": {},
            "The Three Sisters": {},
          },
          "Glen Etive": {
            Dalness: {},
            "Glen Etive Forest": {},
            "Loch Etive": {},
            "Lochan Urr": {},
            "View to Skyfall": {},
          },
          "Rannoch Moor": {},
        },
        "🏞️ Caithness": {
          "Duncansby Head": {},
          "Noss Head": {},
        },
        "Isle of Raasay": {
          Brochel: {},
        },
        "Isle of Skye": {
          Duirinish: {
            "Neist Point": {},
          },
          Dunvegan: {},
          Sleat: {
            Armadale: {},
            Isleornsay: {},
            "Dunscaith Castle": {},
            Teangue: {},
          },
          Strathaird: {
            Elgol: {},
          },
          "The Cullins": {
            "Fairy Pools": {},
            "Loch Coruisk": {},
            Sligachan: {},
          },
          Trotternish: {
            Portree: {},
            "The Quiraing": {},
            "The Storr": {},
          },
          Waternish: {},
        },
        "🏞️ Knoydart": {},
        "🏞️ Loch Shiel": {
          Glenfinnan: {},
        },
        Moidart: {},
        Morar: {
          "Larachmhor Gardens": {},
          "Loch Morar": {},
          Mallaig: {},
        },
        Morvern: {
          Lochaline: {},
        },
        "Ross & Cromarty": {
          Balintore: {},
          "🏞️ Kintail": {
            "Eilean Donan Castle": {},
            Glenelg: {},
            "Kyle of Lochalsh": {},
            "Ratagan Pass": {},
            "Strath Croe": {},
          },
          "Loch Carron": {
            Attadale: {},
            Plockton: {},
            "Strome Castle": {},
          },
          "Tarbat Ness": {},
          "🏞️ Wester Ross": {
            Achnasheen: {},
            Applecross: {
              "An Àird Bhàn": {},
              "Bealach na Bà": {},
            },
            "Glen Carron": {},
            "Gruinard Bay": {},
            "Loch Ewe": {
              "Inverewe Garden": {},
            },
            "Loch Maree": {},
            "Upper Loch Torridon": {
              "Ben-damph Forest": {},
              Shieldaig: {},
            },
          },
          Ullapool: {},
        },
        "🗺️ Sutherland": {
          Balnakeil: {},
          Durness: {
            "Smoo Cave": {},
          },
          Golspie: {
            "Dunrobin Castle": {},
          },
          "🏞️ Kyle of Tongue": {},
          Lairg: {},
          "Loch Eriboll": {},
          "🏞️ North-west Sutherland": {
            "Loch Stack": {},
          },
          "Sandwood Bay": {},
          "Strathy Point": {},
        },
        "The Great Glen": {
          "Loch Arkaig": {},
          "Loch Lochy": {},
          "Loch Ness": {
            "Fort Augustus": {},
          },
        },
      },
      "🏞️ Loch Lomond & The Trossachs": {
        "Falls of Falloch": {},
        "Loch Lomond": {
          Inveruglas: {},
        },
      },
      "🗺️ Lothian": {
        "Balgone Estate": {},
        "🏙️ Edinburgh": {
          "Royal Botanic Garden Edinburgh": {},
          Stockbridge: {},
          "Water of Leith": {},
        },
        Haddington: {},
      },
      "🗺️ Moray": {
        "Bow Fiddle Rock": {},
        "Charlestown of Aberlour": {},
        "Elgin Cathedral": {},
      },
      "🗺️ Outer Hebrides": {
        "🗺️ Barra": {
          Ardmhor: {},
          Borve: {},
          Castlebay: {
            Heabhal: {},
          },
          "Dùn Bàn": {},
          Earsary: {},
          Eoligarry: {},
          Vatersay: {},
        },
        "🗺️ Lewis & Harris": {
          Harris: {
            "North Harris": {},
            "South Harris": {
              Hushinish: {},
              Luskentyre: {},
              Seilebost: {},
            },
            "Sound of Harris": {},
            Tarbert: {},
          },
          Lewis: {
            "Butt of Lewis": {},
            Callanish: {},
            Carloway: {},
            Crowlista: {},
            "Eye Peninsula": {},
            "Great Bernera": {},
            Stornoway: {},
          },
        },
        "St Kilda": {
          Boreray: {},
          Hirta: {},
        },
        "🗺️ Uist & Benbecula": {
          Benbecula: {},
          Berneray: {},
          Eriskay: {
            Acairseid: {},
            "Rubha Ban": {},
          },
          Grimsay: {},
          "North Uist": {
            Baleloch: {},
            "Trinity Temple": {},
          },
          "South Uist": {
            "Beinn Mhòr": {},
            Kildonan: {},
            "Loch Druidibeag": {},
            "Rubha Àird a' Mhuile": {},
          },
        },
      },
      "🗺️ Perth & Kinross": {
        "🏞️ Loch Rannoch & Glen Lyon": {
          "Dunalasdair Estate": {},
          "Loch Rannoch": {},
          "Loch Tay": {
            "Ben Lawers": {},
            Kenmore: {},
          },
          "Loch Tummel": {},
        },
      },
    },
    "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales": {
      "🏞️ Bannau Brycheiniog": {
        "Henrhyd Falls": {},
      },
      "🗺️ Carmarthenshire": {
        "National Botanic Garden of Wales": {},
        "Newton House": {},
      },
      "🗺️ Ceredigion": {
        Aberaeron: {},
        "Devil's Bridge": {},
      },
      "🗺️ Conwy County": {
        Conwy: {},
        Deganwy: {},
        "Gwrych Castle": {},
        Llandudno: {},
        "Rhaeadr Y Graig Lwyd": {},
      },
      "🏞️ Eryri": {
        "Aber Falls": {},
        Llanberis: {
          "Dinorwic Quarry": {},
        },
      },
      "🗺️ Gwynedd": {
        Caernarfon: {},
        "Penrhyn Castle": {},
        Portmeirion: {},
      },
      "🗺️ Isle of Anglesey": {
        "Holy Island": {
          "South Stack": {},
        },
        "Menai Bridge": {},
      },
      "🗺️ Pembrokeshire": {
        "🏙️ St Davids": {},
        "St Govan's Head": {},
        Tenby: {},
      },
      "🗺️ Powys": {
        "Hay-on-Wye": {},
      },
    },
  },
};
