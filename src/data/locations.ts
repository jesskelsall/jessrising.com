import { LocationHierarchy } from "../types/location";

/**
 * Gallery photo tests will fail on locations not defined here
 * Locations tests will fail if all locations aren't unique
 * Nesting expresses hierarchy
 */
export const locationHierarchy: LocationHierarchy = {
  "United Kingdom": {
    England: {
      "County Durham": {
        Durham: {
          "Durham Cathedral": {},
        },
        "Raby Castle": {},
      },
      Home: {},
      "Lake District": {
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
          Mellbreak: {},
          "Scale Beck": {},
        },
        "Derwent Water": {
          "Derwent Fells": {
            "Cat Bells": {},
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
      Newcastle: {
        "Neville Hall": {},
      },
      Northumberland: {
        Cragside: {},
        "Dunstanburgh Castle": {},
        Seahouses: {},
      },
      Ripon: {
        "Fountains Abbey": {},
      },
      "Scotch Corner": {},
      Seaton: {},
      Shap: {},
      Washington: {
        "Penshaw Monument": {},
      },
      Yorkshire: {
        Knaresborough: {},
        York: {
          "Clifford's Tower": {},
          "National Railway Museum": {},
        },
        "Yorkshire Dales": {
          "Blea Moor": {},
          Clapham: {},
          "Howgill Fells": {},
          Ingleborough: {
            "Gaping Gill": {},
          },
          "Ribblehead Viaduct": {},
          Whernside: {},
        },
      },
    },
    Scotland: {
      Achnasheen: {
        "Achnashellach Forest": {},
        "Loch a'Chroisg": {},
        "Loch Gowan": {},
        "Loch Sgamhain": {},
      },
      Appin: {},
      "Applecross Peninsula": {
        "An Àird Bhàn": {},
        Applecross: {},
        "Bealach na Bà": {},
      },
      Ardnamurchan: {
        Glenbeg: {},
        Kilchoan: {},
        "Point of Ardnamurchan": {},
      },
      "Assynt-Coigach": {
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
      },
      "Ben Nevis & Glen Coe": {
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
      },
      Cairngorms: {
        "Abernethy Forest": {
          "Loch Garten": {},
          "Loch Mallachie": {},
        },
        Balmoral: {},
        "Cairngorm Mountains": {},
        "Glen More": {
          "Loch Morlich": {},
        },
        Kingussie: {
          "Ruthven Barracks": {},
        },
        "Loch Ericht": {},
        "Loch Vaa": {},
        "Muir of Dinnet": {},
        Rothiemurchus: {},
        Tomintoul: {},
      },
      Caithness: {
        "Duncansby Head": {},
        "Noss Head": {},
      },
      Cowal: {
        "Puck's Glen": {},
      },
      Cromar: {},
      "Easter Ross": {
        Balintore: {},
        "Tarbat Ness": {},
      },
      Dalwhinnie: {},
      Edinburgh: {
        "Princes Street Gardens": {},
        Stockbridge: {},
        "Water of Leith": {},
      },
      "Glen Creran": {},
      Glenfinnan: {},
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
      "Isle of Skye": {
        Duirinish: {
          "Neist Point": {},
        },
        Dunvegan: {},
        "Isle of Raasay": {
          Brochel: {},
        },
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
      Kintail: {
        "Eilean Donan Castle": {},
        Glenelg: {},
        "Kyle of Lochalsh": {},
        Plockton: {},
        "Ratagan Pass": {},
        "Strath Croe": {},
      },
      Knoydart: {},
      "Loch Awe": {
        "Kilchurn Castle": {},
        "St Conan's Kirk": {},
      },
      "Loch Carron": {
        Attadale: {},
        "Strome Castle": {},
      },
      "Loch Lomond & The Trossachs": {
        "Falls of Falloch": {},
        "Loch Lomond": {
          Inveruglas: {},
        },
      },
      "Loch Ness": {
        "Fort Augustus": {},
      },
      "Loch Rannoch & Glen Lyon": {
        "Dunalasdair Estate": {},
        "Loch Rannoch": {},
        "Loch Tummel": {},
      },
      "Loch Shiel": {
        Sunart: {
          "Loch Sunart": {},
        },
      },
      Moidart: {
        "Loch Moidart": {},
      },
      Morar: {
        "Larachmhor Gardens": {},
        "Loch Morar": {},
        Mallaig: {},
      },
      Morvern: {
        "Loch Aline": {},
        Lochaline: {},
      },
      Oban: {
        "Firth of Lorn": {},
        "McCaig's Tower": {},
      },
      "Outer Hebrides": {
        Barra: {
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
        "Lewis & Harris": {
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
        "Uist & Benbecula": {
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
      "Rannoch Moor": {
        "Rannoch Station": {},
      },
      Sandaig: {},
      "St Kilda": {
        Boreray: {},
        Hirta: {},
      },
      Sutherland: {
        Durness: {
          "Smoo Cave": {},
        },
        Golspie: {
          "Dunrobin Castle": {},
        },
        "Kyle of Tongue": {},
        Lairg: {},
        "Loch Eriboll": {},
        "North-west Sutherland": {
          "Loch Stack": {},
        },
        "Sandwood Bay": {},
        "Strathy Point": {},
      },
      "The Great Glen": {
        Lochaber: {
          "Loch Arkaig": {},
        },
        "Loch Lochy": {},
      },
      Ullapool: {},
      "Wester Ross": {
        "Gruinard Bay": {},
        "Loch Ewe": {
          "Inverewe Garden": {},
        },
        "Loch Maree": {},
        "Upper Loch Torridon": {
          Annat: {},
          "Ben-damph Forest": {},
          Shieldaig: {},
          Torridon: {},
        },
      },
    },
    Wales: {
      "Eryri National Park": {
        "Aber Falls": {},
      },
      "Conwy County": {
        Conwy: {},
        Deganwy: {},
        "Gwrych Castle": {},
        Llandudno: {},
      },
      Gwynedd: {
        "Penrhyn Castle": {},
      },
      "Isle of Anglesey": {
        "Holy Island": {
          "South Stack": {},
        },
      },
    },
  },
};

export const LocationFlags: Record<string, string> = {
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "United Kingdom": "🇬🇧",
  Wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
};
