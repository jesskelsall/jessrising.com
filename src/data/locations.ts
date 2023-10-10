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
          "Cat Bells": {},
        },
        "Ennerdale Water": {
          "Ennerdale Fell": {
            "Caw Fell": {},
            "Scoat Fell": {},
            Steeple: {},
          },
          "Ennerdale Forest": {},
        },
        Fleetwith: {
          Brandreth: {},
          "Fleetwith Pike": {},
          "Grey Knotts": {},
        },
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
        "Wast Water": {
          "Wasdale Head": {
            "Great Gable": {},
            Mosedale: {
              Pillar: {},
            },
          },
        },
      },
      Newcastle: {
        "Neville Hall": {},
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
        "The Cullins": {
          "Fairy Pools": {},
          "Loch Coruisk": {},
        },
        Sleat: {
          Armadale: {},
          Isleornsay: {},
          Teangue: {},
        },
        Strathaird: {
          Elgol: {},
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
        "Loch Alsh": {},
        "Ratagan Pass": {},
      },
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
      Lochaber: {
        "Loch Arkaig": {},
      },
      Moidart: {
        "Loch Moidart": {},
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
          Lewis: {},
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
