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
        Beamish: {},
        "🏙️ Durham": {
          "Durham Cathedral": {},
        },
        Home: {},
        "🏞️ North Pennines": {
          Teesdale: {
            "💦 Low Force": {},
            "💦 Summerhill Force": {},
            Bowlees: {},
          },
        },
        "Raby Castle": {},
      },
      "🗺️ Cumbria": {
        "🌳 Acorn Bank": {},
        "🏘️ Brampton": {},
        "🏘️ Brough": {},
        "🏞️ Lake District": {
          "📒 Central Fells": {
            "🪨 Castlerigg Stone Circle": {},
            Borrowdale: {
              "⛰️ Castle Crag": {},
              "🏘️ Seathwaite": {},
            },
            "💧 Derwent Water": {},
            "Grasmere to Loughrigg": {
              "🏘️ Grasmere Village": {},
              "Rydal Cave": {},
              "White Moss Common": {},
            },
            "St John's-in-the-Vale": {},
          },
          "📒 Eastern Fells": {
            "Dalemain Mansion": {},
            "Deepdale Common": {
              "⛰️ Arnison Crag": {},
              "⛰️ Birks": {},
              "⛰️ St Sunday Crag": {},
            },
            Dovedale: {
              "💧 Brothers Water": {},
              "⛰️ Hartsop Above How": {},
              "⛰️ High Hartsop Dodd": {},
              "⛰️ Little Hart Crag": {},
            },
            Glencoyne: {
              "⛰️ Hart Side": {},
            },
            "Glenridding Common": {
              "⛰️ Birkhouse Moor": {},
              "⛰️ Catstye Cam": {},
              "🏘️ Glenridding": {},
              "⛰️ Glenridding Dodd": {},
              "⛰️ Sheffield Pike": {},
            },
            Grisedale: {
              "💧 Grisedale Tarn": {},
            },
            "Helvellyn Ridge": {
              "⛰️ Clough Head": {},
              "⛰️ Dollywaggon Pike": {},
              "⛰️ Helvellyn": {
                "Striding Edge": {},
                "Swirral Edge": {},
              },
              "⛰️ Nethermost Pike": {},
              "⛰️ Raise": {},
              "Sticks Pass": {},
              "The Dodds": {
                "⛰️ Great Dodd": {},
                "⛰️ Stybarrow Dodd": {},
                "⛰️ Watson's Dodd": {},
              },
              "Threlkeld Common": {},
              "⛰️ White Side": {},
            },
            "Kirkstone Pass": {
              "⛰️ Middle Dodd": {},
              "⛰️ Red Screes": {},
            },
            Matterdale: {
              "💦 Aira Force": {},
              "⛰️ Gowbarrow Fell": {},
              "⛰️ Great Mell Fell": {},
            },
            "Rydal Fell": {
              "⛰️ Dove Crag": {},
              "⛰️ Fairfield": {},
              "⛰️ Great Rigg": {},
              "⛰️ Hart Crag": {},
              "⛰️ Heron Pike": {},
              "⛰️ High Pike (Scandale)": {},
              "⛰️ Low Pike": {},
              "⛰️ Nab Scar": {},
              "⛰️ Seat Sandal": {},
              "⛰️ Stone Arthur": {},
            },
            "💧 Ullswater": {},
          },
          "📒 Far Eastern Fells": {
            "Bampton Common": {
              "⛰️ Arthur's Pike": {},
              "⛰️ Bonscale Pike": {},
              "⛰️ Loadpot Hill": {},
              "⛰️ Wether Hill": {},
            },
            "High Street Ridge": {
              "⛰️ High Raise (Martindale)": {},
              "⛰️ High Street": {},
              "⛰️ Rampsgill Head": {},
              "⛰️ The Knott": {},
              "⛰️ Thornthwaite Crag": {},
            },
            "Mardale Common": {
              "⛰️ Branstree": {},
              "⛰️ Selside Pike": {},
            },
            "Martindale Common": {
              "⛰️ Beda Fell": {},
              "⛰️ Hallin Fell": {},
              "⛰️ Place Fell": {},
              "⛰️ Steel Knotts": {},
            },
            "Pasture Beck": {
              "⛰️ Gray Crag": {},
              "🏘️ Hartsop": {},
              "⛰️ Hartsop Dodd": {},
              "⛰️ Stony Cove Pike": {},
            },
            Riggindale: {
              "⛰️ Kidsty Pike": {},
              "⛰️ Rough Crag": {},
            },
            "Sleddale Fell": {
              "⛰️ Grey Crag": {},
              "⛰️ Tarn Crag (Sleddale)": {},
            },
            Troutbeck: {
              "⛰️ Sallows": {},
              "⛰️ Sour Howes": {},
              "⛰️ Troutbeck Tongue": {},
              "⛰️ Wansfell": {},
            },
          },
          "📒 Northern Fells": {
            Bannerdale: {
              "⛰️ Bannerdale Crags": {},
              "⛰️ Bowscale Fell": {},
              "⛰️ Souther Fell": {},
            },
            "Blencathra Fells": {
              "⛰️ Blencathra": {},
              "Blease Fell": {},
              "⛰️ Mungrisdale Common": {},
            },
            "Caldbeck Fells": {
              "⛰️ Carrock Fell": {},
              "⛰️ Great Calva": {},
              "⛰️ Knott": {},
              "⛰️ High Pike (Caldbeck)": {},
            },
            "🌲 Dodd Wood": {
              "⛰️ Dodd": {},
            },
            "⛰️ Latrigg": {},
            "Skiddaw Fells": {
              "⛰️ Bakestall": {},
              "Longside Edge Ridge": {
                "⛰️ Carl Side": {},
                "⛰️ Longside Edge": {},
                "⛰️ Ullock Pike": {},
                "White Stones": {},
              },
              "⛰️ Lonscale Fell": {},
              "⛰️ Skiddaw Little Man": {},
              "⛰️ Skiddaw": {},
            },
            "Uldale Fells": {
              "⛰️ Binsey": {},
              "⛰️ Brae Fell": {},
              "⛰️ Great Cockup": {},
              "⛰️ Great Sca Fell": {},
              "⛰️ Longlands Fell": {},
              "⛰️ Meal Fell": {},
            },
          },
          "📒 Northwestern Fells": {
            "💧 Crummock Water": {},
            "Derwent Fells": {
              "⛰️ Cat Bells": {},
              "⛰️ Dale Head": {},
              "⛰️ High Spy": {},
              "⛰️ Hindscarth": {},
              "⛰️ Maiden Moor": {},
              "💦 Moss Force": {},
              "⛰️ Robinson": {},
            },
            "Grasmoor Fells": {
              "Grasmoor Massiff": {
                "⛰️ Crag Hill": {},
                "⛰️ Grasmoor": {},
                "⛰️ Sail": {},
                "⛰️ Wandope": {},
                "⛰️ Whiteless Pike": {},
              },
              "Hopegill Head Ridge": {
                "⛰️ Grisedale Pike": {},
                "⛰️ Hopegill Head": {},
                "⛰️ Whiteside": {},
              },
              "Keskdale Fells": {
                "⛰️ Ard Crags": {},
                "⛰️ Knott Rigg": {},
              },
              "Stoneycroft Fells": {
                "⛰️ Barrow": {},
                "⛰️ Causey Pike": {},
                "⛰️ Outerside": {},
                "⛰️ Scar Crags": {},
              },
            },
            Lingholm: {},
            "Lorton Fells": {
              "⛰️ Barf": {},
              "⛰️ Broom Fell": {},
              "⛰️ Graystones": {},
              "⛰️ Lord's Seat": {},
              "⛰️ Whinlatter": {},
            },
            Newlands: {},
            Rannerdale: {
              "⛰️ Rannerdale Knotts": {},
            },
            "🌲 Whinlatter Forest": {},
            Wythop: {
              "⛰️ Ling Fell": {},
              "⛰️ Sale Fell": {},
            },
          },
          "📒 Southern Fells": {
            "Coniston Fells": {
              "⛰️ The Old Man of Coniston": {},
            },
            Eskdale: {
              "Eskdale Fell": {},
              "Hardknott Pass": {},
              "Lingcove Beck": {},
            },
            Langdale: {},
            "Stockley Bridge": {},
          },
          "📒 Western Fells": {
            "Buttermere Valley": {
              "💧 Buttermere": {},
              "🏘️ Buttermere Village": {},
              "Buttermere Ridge": {
                "⛰️ High Crag": {},
                "⛰️ High Stile": {},
                "⛰️ Red Pike (Buttermere)": {},
                "Scale Beck": {},
                "Scarth Gap Pass": {},
              },
              "Gale Fell": {
                "⛰️ Great Borne": {},
                "⛰️ Starling Dodd": {},
              },
              "Gatesgarth Farm": {},
              "Warnscale Bottom": {},
            },
            "Ennerdale Valley": {
              "Ennerdale Fell": {
                "⛰️ Caw Fell": {},
                "⛰️ Haycock": {},
                "⛰️ Scoat Fell": {},
                "⛰️ Steeple": {},
              },
              "🌲 Ennerdale Forest": {},
              "💧 Ennerdale Water": {},
              "Kinniside Common": {
                "⛰️ Crag Fell": {},
                "⛰️ Grike": {},
                "⛰️ Lank Rigg": {},
              },
            },
            Fleetwith: {
              "Aaron Slack": {},
              "Brandreth Rise": {
                "⛰️ Base Brown": {},
                "⛰️ Brandreth": {},
                "⛰️ Green Gable": {},
                "⛰️ Grey Knotts": {},
              },
              "Dubs Quarry": {},
              "⛰️ Fleetwith Pike": {},
              "⛰️ Haystacks": {},
              "Sty Head": {},
            },
            "Loweswater Valley": {
              "🌲 Holme Wood": {},
              "💧 Loweswater": {},
              "Loweswater Fell": {
                "⛰️ Blake Fell": {},
                "⛰️ Burnbank Fell": {},
                "⛰️ Gavel Fell": {},
                "⛰️ Hen Comb": {},
                "⛰️ Mellbreak": {},
              },
              "Mosser Fell": {
                "⛰️ Fellbarrow": {},
                "⛰️ Low Fell": {},
              },
            },
            "Wasdale Valley": {
              "Copeland Forest": {
                "Dore Head": {},
                "⛰️ Buckbarrow": {},
                "⛰️ Middle Fell": {},
                "⛰️ Seatallan": {},
                "⛰️ Yewbarrow": {},
              },
              "Mosedale Fells": {
                "⛰️ Pillar": {},
                "⛰️ Red Pike (Wasdale)": {},
              },
              "Wasdale Head": {},
              "Wasdale Fell": {
                "⛰️ Kirk Fell": {},
                "⛰️ Great Gable": {},
              },
              "💧 Wast Water": {},
            },
          },
          "South Lakes": {
            "Coniston Valley": {
              "🐑 Yew Tree Farm": {},
            },
            "Windermere Valley": {
              "🏘️ Ambleside": {},
              Stockghyll: {},
            },
          },
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
        "Tanfield Railway": {},
      },
      "🗺️ Northumberland": {
        Alnwick: {
          "Alnwick Garden": {},
          "Barter Books": {},
        },
        "Belsay Hall": {},
        Bamburgh: {},
        Cragside: {},
        "Dunstanburgh Castle": {},
        "Farne Islands": {},
        "Hadrian's Wall": {},
        "Kielder Water": {},
        "🏝️ Lindisfarne": {},
        "North Charlton": {},
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
        "🪨 Druid's Temple": {},
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
          "Ash Fell": {},
          "🏘️ Clapham": {},
          "Ingleborough Common": {
            "Gaping Gill": {},
            "White Scar Cave": {},
          },
          "🏘️ Malham": {
            "Gordale Scar": {},
          },
          Ribblehead: {
            "Blea Moor": {},
            "Ribblehead Viaduct": {},
            "⛰️ Whernside": {},
          },
          "🗺️ Wensleydale": {
            "🏘️ Aysgarth": {},
            "💦 Cotter Force": {},
            "🏘️ Hardraw": {},
            "🏘️ Hawes": {},
          },
          "🗺️ Wharfedale": {
            "🏘️ Appletreewick": {},
          },
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
        "🏝️ Bute": {
          Kerrycroy: {},
          "Kyles of Bute": {},
          "Mount Stuart": {},
          Rothesay: {
            "Ardencraig Gardens": {},
          },
        },
        Kintyre: {
          "Crinan Canal": {},
          "Tarbert (Kintyre)": {},
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
        "Cairngorm Mountains": {
          "🦌 Cairngorm Reindeer Herd": {},
        },
        Dalwhinnie: {
          "Loch Ericht": {},
        },
        "Loch Morlich": {},
        "Loch Vaa": {},
        "Muir of Dinnet": {},
        Rothiemurchus: {},
        Tomintoul: {},
      },
      "🏞️ Galloway Forest Park": {
        "Clatteringshaws Loch": {},
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
            "Glen Etive Forest": {},
            "Loch Etive": {},
            "Lochan Urr": {},
          },
          "🏘️ Kinlochleven": {},
          "Rannoch Moor": {},
        },
        "🏞️ Caithness": {
          "Duncansby Head": {},
          "Noss Head": {},
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
      "🗺️ Inner Hebrides": {
        "🏝️ Coll": {
          Arileod: {},
          Arinagour: {},
          Crossapol: {},
          Torastan: {},
        },
        "🏝️ Islay": {
          "Loch Finlaggan": {},
          "Port Askaig": {},
          "Rinns of Islay": {},
          "South Islay": {
            Ardbeg: {},
            Lagavulin: {},
            Laphroaig: {},
            "Port Ellen": {},
          },
        },
        "🏝️ Mull": {
          Aros: {},
          Croggan: {},
          Fionnphort: {},
          "Glen More": {},
          "🏝️ Iona": {
            "Iona Abbey": {},
          },
          "Loch na Keal": {},
          Lochbuie: {},
          "Loch Spelve": {},
          Mishnish: {},
          Mornish: {},
          "Sound of Mull": {},
          Tobermory: {},
        },
        "🏝️ Raasay": {
          Brochel: {},
        },
        "🏝️ Skye": {
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
        "🏝️ Tiree": {
          Balephetrish: {},
          Balephuil: {},
          Caolas: {},
          Hough: {},
          Hynish: {},
          Kilkenneth: {},
          Scarinish: {},
        },
        "🗺️ Treshnish Isles": {
          "🏝️ Lunga": {},
          "🏝️ Staffa": {},
        },
      },
      "🏞️ Loch Lomond & The Trossachs": {
        "Falls of Falloch": {},
        "Loch Katrine": {},
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
        "Tantallon Castle": {},
      },
      "🗺️ Moray": {
        "Bow Fiddle Rock": {},
        "Charlestown of Aberlour": {},
        "Elgin Cathedral": {},
      },
      "🗺️ Outer Hebrides": {
        "🗺️ Barra & Vatersay": {
          "🏝️ Barra": {
            Ardmhor: {},
            Borve: {},
            "🏘️ Castlebay": {
              Heabhal: {},
            },
            "Dùn Bàn": {},
            Earsary: {},
            Eoligarry: {},
          },
          "🏝️ Vatersay": {},
        },
        "🏝️ Lewis & Harris": {
          Harris: {
            "North Harris": {},
            "South Harris": {
              Hushinish: {},
              Luskentyre: {},
              Seilebost: {},
            },
            "Sound of Harris": {},
            "Tarbert (Harris)": {},
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
        "🗺️ St Kilda": {
          "🏝️ Boreray": {},
          "🏝️ Hirta": {},
        },
        "🗺️ Uist & Benbecula": {
          "🏝️ Benbecula": {},
          "🏝️ Berneray": {},
          "🏝️ Eriskay": {
            Acairseid: {},
            "Rubha Ban": {},
          },
          "🏝️ Grimsay": {},
          "🏝️ North Uist": {
            Baleloch: {},
            "Trinity Temple": {},
          },
          "🏝️ South Uist": {
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
          "Garry Bridge": {},
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
        "🏝️ Mainland (Shetland)": {
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
        "🏝️ Unst": {
          Haroldswick: {},
          "Herma Ness": {},
        },
        "🏝️ Yell": {},
      },
      "🗺️ Stirling Council": {
        "🏘️ Dunblane": {},
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
      "🏝️ Isle of Anglesey": {
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
  "🇪🇪 Estonia": {
    "🏙️ Tallinn": {
      Vanalinn: {
        "⛪️ Niguliste Muuseum": {},
        "Patkuli Viewing Platform": {},
      },
    },
  },
  "🇫🇮 Finland": {
    "🏙️ Helsinki": {
      "🚇 Helsinki Metro": {},
      Kaivopuisto: {},
      Kallio: {},
      Katajanokka: {},
      Kauppatori: {},
      Kluuvi: {},
      Kruununhaka: {
        "⛪️ Helsingin Tuomiokirkko": {},
        Senaatintori: {},
      },
      Punavuori: {},
      Töölö: {},
      Ullanlinna: {},
    },
  },
  "🇩🇪 Germany": {
    "🏙️ Hamburg": {
      "Elbphilharmonie Hamburg": {},
      Landungsbrücken: {},
      "Miniatur Wunderland": {
        "MW Italien": {},
        "MW Knuffingen Airport": {},
        "MW Monaco & die Provence": {},
        "MW Schweiz": {},
      },
      Speicherstadt: {},
      "⛪️ St. Peter's Church": {},
    },
  },
  "🇮🇸 Iceland": {
    "🗺️ Austurland": {
      "🗺️ Fjarðabyggð": {
        "🏘️ Eskifjörður": {},
        "🏞️ Hólmanes": {},
        "🏘️ Fáskrúðsfjörður": {},
        "🏘️ Neskaupstaður": {},
        "🏘️ Reyðarfjörður": {},
      },
      "🚗 Route 925": {},
      "🏘️ Seyðisfjörður": {
        "🚗 Route 93": {},
        "🚗 Route 951": {},
        "🚗 Route 952": {},
      },
      Stuðlagil: {},
      Svartfell: {},
    },
    "🗺️ Norðurland eystra": {
      "🏙️ Akureyri": {},
      "🗺️ Norðurþing": {
        "Jökulsá á Fjöllum": {
          Ásbyrgi: {},
          "💦 Dettifoss": {},
        },
      },
      Siglufjörður: {},
      "🗺️ Þingeyjarsveit": {
        "Námafjall Hverir": {},
      },
    },
    "🗺️ Norðurland vestra": {
      Flóðið: {},
      "🚗 Route 76": {
        "⛪️ Grafarkirkja": {},
      },
      "🚗 Route 711": {
        Hvítserkur: {},
      },
      Kolugljúfur: {},
    },
    "🏙️ Reykjavík": {
      Perlan: {},
      Skólavörðustígur: {},
    },
    "🗺️ Suðurland": {
      "Golden Circle": {
        "🚗 Route 37": {
          "💦 Brúarfoss": {},
          "💦 Geysir Hot Springs": {},
          "💦 Gullfoss": {},
        },
        "🏘️ Skálholt": {},
        Þingvallavatn: {
          Nesjavellir: {},
          "🏞️ Þingvellir": {},
        },
      },
      "🗺️ Hornafjörður": {
        "🏘️ Höfn": {},
        Hvalnes: {},
        Vestrahorn: {
          Almannaskarð: {},
          Stokksnes: {},
        },
      },
      "🗺️ Mýrdalshreppur": {
        Dyrhólaey: {},
        Reynisfjara: {},
        Sólheimajökull: {},
        "Vík í Mýrdal": {},
      },
      "🗺️ Rangárþing eystra": {
        "🚗 Route 249": {
          Seljalandsfoss: {},
        },
        "🚗 Route 261": {},
        Skógar: {
          "💦 Kvernufoss": {},
          Rútshellir: {},
          "💦 Skógafoss": {},
        },
      },
      "🗺️ Skaftárhreppur": {
        "🏘️ Kirkjubæjarklaustur": {},
      },
      "🚗 Route 32": {
        Gjáin: {},
        Háifoss: {},
        Þjóðveldisbærinn: {},
      },
      "🏔️ Vatnajökull": {
        Breiðamerkurjökull: {
          Breiðamerkursandur: {},
          "Breiðamerkurjökull Ice Caves": {},
          Jökulsárlón: {},
        },
        Öræfajökull: {},
        Reynivellir: {},
      },
    },
    "🗺️ Suðurnes": {},
    "🗺️ Vesturland": {
      Grábrók: {},
      Snæfellsnes: {
        "Snæfellsnes North Coast": {
          Hellissandur: {},
          Kirkjufell: {},
          Ólafsvík: {},
          Stykkishólmur: {},
        },
        "Snæfellsnes South Coast": {
          Arnarstapi: {},
          Búðir: {},
        },
        "🏞️ Snæfellsjökulsþjóðgarður": {
          Djúpalónssandur: {},
          Lóndrangar: {},
        },
      },
    },
  },
  "🇳🇱 Netherlands": {
    "🗺️ Friesland": {},
    "🗺️ Overijssel": {
      Giethoorn: {},
    },
    "🗺️ South Holland": {
      Kinderdijk: {},
    },
    "🗺️ Utrecht": {
      Amersfoort: {},
    },
  },
  "🇵🇹 Portugal": {
    "🏙️ Lisboa": {
      Alfama: {
        "🏰 Castelo de São Jorge": {},
        "⛪️ Panteão Nacional": {},
        "Portas do Sol": {},
      },
      "Bairro Alto": {
        "⛪️ Igreja de Santa Catarina": {},
        "⛪️ Igreja de São Roque": {},
        "Miradouro de São Pedro de Alcântara": {},
      },
      Baixa: {
        "Arco da Rua Augusta": {},
        "Elevador de Santa Justa": {},
        "Museu Arqueológico do Carmo": {},
      },
      Belém: {
        "⛪️ Igreja de Santa Maria de Belém": {},
        "⛪️ Mosteiro dos Jerónimos": {},
        "🏰 Torre de Belém": {},
      },
      Campolide: {
        "Fundação das Casas Fronteira e Alorna": {},
      },
      Graça: {},
    },
  },
  "🇸🇪 Sweden": {
    "🏝️ Gotland": {
      Visby: {
        Nygatan: {
          Kramhållplats: {},
          Trappgatan: {},
        },
        "Södra Kyrkogatan": {
          "S:ta Karins Kyrkoruin": {},
        },
        Strandgatan: {
          Fiskargränd: {},
          Specksgränd: {},
          "Värdshuset Lindgården": {},
        },
        "Visby Ringmur": {},
      },
    },
    "🏙️ Stockholm": {
      Djurgården: {
        Skansen: {},
        Vasamuseet: {},
      },
      "Gamla Stan": {
        Storkyrkan: {},
      },
      "Kvarteret Kattörat": {},
      Riddarholmen: {},
      "Stockholms Stadshus": {},
      "🚇 Stockholm Metro": {},
    },
  },
};
