import { LocationHierarchy } from "../types/location";

/**
 * Gallery photo tests will fail on locations not defined here
 * Locations tests will fail if all locations aren't unique
 * Nesting expresses hierarchy
 */
export const locationHierarchy: LocationHierarchy = {
  "🇬🇧 United Kingdom": {
    "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England": {
      "🏙️ Bristol": {},
      "🗺️ Cornwall": {
        "St Ives": {},
        Tintagel: {},
      },
      "🗺️ County Durham": {
        "🏙️ Durham": {
          "Durham Cathedral": {},
        },
        Home: {},
        "Raby Castle": {},
        Teesdale: {
          Bowlees: {},
        },
      },
      "🗺️ Cumbria": {
        "🏞️ Lake District": {
          "Lakes Central": {
            Lodore: {},
          },
          "Lakes North": {
            Blencathra: {
              "Blease Fell": {},
            },
            "Caldbeck Fells": {
              "Carrock Fell": {},
              "Great Calva": {},
            },
            "Uldale Fells": {},
          },
          "Lakes Northwest": {
            "Lorton Fells": {
              Whinlatter: {},
            },
            "Whinlatter Forest": {},
          },
          "Lakes South": {
            Ambleside: {},
            Grasmere: {},
            "Rydal Fells": {
              Fairfield: {},
              "Hart Crag": {},
              "Low Pike": {},
            },
          },
          "Bassenthwaite Lake": {
            Wythop: {},
          },
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
              "The Old Man of Coniston": {},
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
          Eskdale: {
            "Hardknott Pass": {},
            "Lingcove Beck": {},
          },
          Fleetwith: {
            Brandreth: {},
            "Fleetwith Pike": {},
            "Grey Knotts": {},
          },
          Keswick: {
            "Castlerigg Stone Circle": {},
          },
          "Kirkstone Pass": {},
          Loweswater: {
            Fellbarrow: {},
            "Holme Wood": {},
            "Low Fell": {},
            "Loweswater Fell": {
              "Burnbank Fell": {},
              "Hen Comb": {},
            },
          },
          Rydal: {
            "Rydal Cave": {},
          },
          Ullswater: {
            "Aira Force": {},
            Glenridding: {},
          },
          "Wast Water": {
            "Eskdale Fell": {},
            "Wasdale Head": {
              "Great Gable": {},
              Mosedale: {
                Pillar: {},
              },
            },
            Yewbarrow: {},
          },
          Wrynose: {},
        },
        Shap: {},
      },
      "🗺️ Devon": {
        Beer: {},
        Clovelly: {},
        Seaton: {},
      },
      "🗺️ Dorset": {
        "Corfe Castle": {},
        Lulworth: {},
        Weymouth: {},
      },
      "🗺️ Gloucestershire": {},
      "🏙️ London": {
        "London Bridge": {},
        "London Underground": {},
        "St Paul's Cathedral": {},
        Westminster: {},
      },
      "🗺️ Tyne & Wear": {
        "🏙️ Newcastle": {
          "Bank House": {},
          "High Level Bridge": {},
          "Newcastle Cathedral": {},
          "Newcastle Quayside": {},
          "The Glasshouse": {},
          "Tyne Bridge": {},
        },
        "Penshaw Monument": {},
        "St Mary's Lighthouse": {},
      },
      "🗺️ Northumberland": {
        Alnwick: {
          "Alnwick Garden": {},
          "Barter Books": {},
        },
        Bamburgh: {},
        Cragside: {},
        "Dunstanburgh Castle": {},
        "Hadrian's Wall": {},
        "Kielder Water": {},
        Lindisfarne: {},
        Seahouses: {},
      },
      "🗺️ Somerset": {
        Bath: {
          "Bath Abbey": {},
          "The Roman Baths": {},
        },
        "Cheddar Gorge": {},
        Glastonbury: {
          "Glastonbury Abbey": {},
          "Glastonbury Tor": {},
        },
        Wells: {
          "The Bishop's Palace": {},
          "Wells Cathedral": {},
        },
      },
      "🗺️ Warwickshire": {
        "Stratford-upon-Avon": {},
      },
      "🗺️ Wiltshire": {
        Salisbury: {
          "Salisbury Cathedral": {},
        },
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
          "York Minster": {},
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
        "🏙️ Aberdeen": {},
        Crovie: {},
        "Rattray Head": {},
      },
      "🗺️ Argyll & Bute": {
        Appin: {},
        Cowal: {
          "Puck's Glen": {},
        },
        Inveraray: {
          "Inveraray Castle": {},
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
          Mingnish: {},
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
            "Duntulm Castle": {},
            "Fairy Glen": {},
            "Lealt Falls": {},
            "Loch Fada": {},
            "Mealt Falls": {},
            Portree: {},
            "Skye Museum of Island Life": {},
            "The Quiraing": {},
            "The Storr": {},
            Uig: {},
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
            Balmacara: {},
            "Eilean Donan Castle": {},
            Glenelg: {},
            Glenshiel: {},
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
          "Loch Garry": {},
          "Loch Lochy": {},
          "Loch Ness": {
            "Fort Augustus": {},
            "Urquhart Castle": {},
          },
          "Loch Oich": {},
        },
      },
      "🏞️ Loch Lomond & The Trossachs": {
        "Falls of Falloch": {},
        "Loch Lomond": {
          Inveruglas: {},
        },
        "Rest and Be Thankful": {},
      },
      "🗺️ Lothian": {
        "Balgone Estate": {},
        "🏙️ Edinburgh": {
          "Calton Hill": {},
          "Princes Street": {},
          "Royal Botanic Garden Edinburgh": {},
          "St Giles' Cathedral": {},
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
      "🗺️ Scottish Borders": {},
      "🗺️ Shetland": {
        Mainland: {
          "Esha Ness": {
            "Eshaness Lighthouse": {},
          },
          Lerwick: {},
          Lunnasting: {},
          "North Roe": {},
          Scalloway: {},
          "St Ninian's Isle": {},
          Sumburgh: {
            "Jarlshof Prehistoric & Norse Settlement": {},
            "Sumburgh Head": {},
          },
          "Weisdale & Whiteness": {},
          "West Burra": {},
        },
        Unst: {
          Haroldswick: {},
          "Herma Ness": {},
        },
        Yell: {},
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
  "🇫🇮 Finland": {
    "🏙️ Helsinki": {
      "Helsinki Metro": {},
      Kaivopuisto: {},
      Katajanokka: {},
      Kauppatori: {},
      Kluuvi: {},
      Kruununhaka: {
        "Helsinki Cathedral": {},
      },
      Töölö: {},
      Ullanlinna: {},
    },
  },
};
