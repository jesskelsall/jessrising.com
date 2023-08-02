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
      York: {
        "Clifford's Tower": {},
        "National Railway Museum": {},
      },
      "Yorkshire Dales": {
        "Blea Moor": {},
        "Howgill Fells": {},
        Ingleborough: {},
        "Ribblehead Viaduct": {},
        Whernside: {},
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
        "Loch na Cuilce": {},
        "The Storr": {},
      },
      Kintail: {
        "Loch Alsh": {},
      },
      "Loch Awe": {
        "St Conan's Kirk": {},
      },
      "Loch Carron": {
        Attadale: {},
        "Strome Castle": {},
      },
      "Loch Lomond & The Trossachs": {
        "Loch Lomond": {
          Inveruglas: {},
        },
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
