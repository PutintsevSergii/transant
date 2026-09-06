import type { HomepageViewModel } from "./homepage-view-model";
import { homepageViewModel } from "./homepage-view-model";
import { createSiteLayout, localizedPath } from "./site-shell-view-model";

export const germanCopy: Readonly<Record<string, string>> = {
  "The TransANT product catalogue presents intermodal, flat, timber, open-box, and tank wagons for defined transport tasks.":
    "Der TransANT-Produktkatalog stellt Intermodal-, Flach-, Holz-, offene Kasten- und Kesselwagen für definierte Transportaufgaben vor.",
  "Model specifications": "Modellspezifikationen",
  "Explore ten intermodal, flat, timber, open-box, and tank wagon configurations from the TransANT product catalogue.":
    "Entdecken Sie zehn Konfigurationen von Intermodal-, Flach-, Holz-, offenen Kasten- und Kesselwagen aus dem TransANT-Produktkatalog.",
  "Visit TransANT at InnoTrans 2026 and discuss the catalogue wagon range, loading configurations, and technical data for your transport task.":
    "Besuchen Sie TransANT auf der InnoTrans 2026 und besprechen Sie das Wagenprogramm, die Ladekonfigurationen und die technischen Daten für Ihre Transportaufgabe.",
  "Product information": "Produktinformationen",
  "Wagon data for a defined transport task":
    "Wagendaten für eine definierte Transportaufgabe",
  "The catalogue presents ten wagon configurations across five product families.":
    "Der Katalog stellt zehn Wagenkonfigurationen in fünf Produktfamilien vor.",
  "Each model is described through its intended cargo, loading configuration, technical specifications, load limits, and special features.":
    "Jedes Modell wird über die vorgesehene Ladung, Ladekonfiguration, technischen Daten, Lastgrenzen und besonderen Merkmale beschrieben.",
  "Cargo and applications": "Ladung und Anwendungen",
  "The catalogue lists typical commodities for each wagon model.":
    "Der Katalog nennt typische Güter für jedes Wagenmodell.",
  "Loading configuration": "Ladekonfiguration",
  "Container pins, walls, stanchions, doors, and other equipment are specified by model.":
    "Containerzapfen, Wände, Rungen, Türen und weitere Ausrüstung sind modellspezifisch angegeben.",
  "Technical specifications": "Technische Spezifikationen",
  "Dimensions, tare weight, load limits, vehicle gauge, and permitted speed are listed per wagon.":
    "Abmessungen, Eigengewicht, Lastgrenzen, Fahrzeugbegrenzungslinie und zulässige Geschwindigkeit sind je Wagen aufgeführt.",
  "Special features": "Besondere Merkmale",
  "Available equipment and special features depend on the selected wagon model.":
    "Verfügbare Ausrüstung und besondere Merkmale hängen vom gewählten Wagenmodell ab.",
  "Model selection": "Modellauswahl",
  "From transport task to wagon specification":
    "Von der Transportaufgabe zur Wagenspezifikation",
  "Match the cargo and loading requirements with a catalogue model, then review its technical data and listed equipment.":
    "Ordnen Sie Ladung und Ladeanforderungen einem Katalogmodell zu und prüfen Sie anschließend dessen technische Daten und aufgeführte Ausrüstung.",
  "Transport task": "Transportaufgabe",
  "Start with the cargo and loading requirements.":
    "Beginnen Sie mit der Ladung und den Ladeanforderungen.",
  "Wagon model": "Wagenmodell",
  "Select the wagon family and model for the intended transport task.":
    "Wählen Sie Wagenfamilie und Modell für die vorgesehene Transportaufgabe.",
  "Technical data": "Technische Daten",
  "Review dimensions, tare weight, load limits, vehicle gauge, and permitted speed.":
    "Prüfen Sie Abmessungen, Eigengewicht, Lastgrenzen, Fahrzeugbegrenzungslinie und zulässige Geschwindigkeit.",
  "Confirm the equipment and special features listed for the selected wagon.":
    "Bestätigen Sie die für den gewählten Wagen aufgeführte Ausrüstung und die besonderen Merkmale.",
  "Review technical data": "Technische Daten prüfen",
  "Wagon selection stages": "Schritte der Wagenauswahl",
  "Freight wagon technical data": "Technische Daten für Güterwagen",
  "Catalogue-grounded information about wagon configurations, loading equipment, dimensions, load limits, vehicle gauge, and operating data.":
    "Katalogbasierte Informationen zu Wagenkonfigurationen, Ladeausrüstung, Abmessungen, Lastgrenzen, Fahrzeugbegrenzungslinie und Betriebsdaten.",
  "Product catalogue": "Produktkatalog",
  "Start with the wagon model and its technical data":
    "Beginnen Sie mit dem Wagenmodell und seinen technischen Daten",
  "Each catalogue model has its own intended cargo, loading configuration, dimensions, tare weight, load limits, vehicle gauge, and permitted speed.":
    "Jedes Katalogmodell hat eine vorgesehene Ladung, Ladekonfiguration, Abmessungen, Eigengewicht, Lastgrenzen, Fahrzeugbegrenzungslinie und zulässige Geschwindigkeit.",
  "Wagon range": "Wagenprogramm",
  "Ten configurations across five wagon families":
    "Zehn Konfigurationen in fünf Wagenfamilien",
  "The catalogue covers intermodal, flat, timber, open-box, and tank wagons. Every model entry identifies its typical commodities, key benefits, and technical specification.":
    "Der Katalog umfasst Intermodal-, Flach-, Holz-, offene Kasten- und Kesselwagen. Jeder Modelleingang nennt typische Güter, zentrale Vorteile und technische Spezifikationen.",
  "TransANT intermodal wagon shown in the product catalogue":
    "Im Produktkatalog dargestellter TransANT-Intermodalwagen",
  "Review loading equipment for the selected model":
    "Ladeausrüstung des gewählten Modells prüfen",
  "The catalogue records model-specific equipment such as container pins, side walls, stanchions, doors, loading schemes, and tank fittings. Availability must be confirmed for the selected wagon.":
    "Der Katalog erfasst modellspezifische Ausrüstung wie Containerzapfen, Seitenwände, Rungen, Türen, Ladeschemata und Kesselarmaturen. Die Verfügbarkeit ist für den gewählten Wagen zu bestätigen.",
  "Mass and load limits": "Masse und Lastgrenzen",
  "Use the figures for the selected wagon configuration":
    "Verwenden Sie die Werte der gewählten Wagenkonfiguration",
  "Tare weight, loading dimensions, loading volume, axle load, and load-limit values differ by model. The product pages reproduce the catalogue values without generalising them across the range.":
    "Eigengewicht, Laderaumabmessungen, Ladevolumen, Achslast und Lastgrenzen unterscheiden sich je Modell. Die Produktseiten geben die Katalogwerte wieder, ohne sie auf das gesamte Programm zu verallgemeinern.",
  "Operation data": "Betriebsdaten",
  "Check gauge, speed, curve radius, and equipment":
    "Begrenzungslinie, Geschwindigkeit, Kurvenradius und Ausrüstung prüfen",
  "Vehicle gauge, permitted speed, minimum curve radius, brake equipment, and other operating details are listed per model and must be checked for the intended use.":
    "Fahrzeugbegrenzungslinie, zulässige Geschwindigkeit, Mindestbogenradius, Bremsausrüstung und weitere Betriebsdaten sind je Modell aufgeführt und für den vorgesehenen Einsatz zu prüfen.",
  "Drawings and technical data": "Zeichnungen und technische Daten",
  "Read the catalogue entry as one model-specific record":
    "Den Katalogeintrag als einen modellspezifischen Datensatz lesen",
  "Use the wagon render, technical drawings, specification tables, loading limits, and catalogue notes together. Any printed ambiguity remains visible and requires confirmation with TransANT.":
    "Nutzen Sie Wagenabbildung, technische Zeichnungen, Spezifikationstabellen, Lastgrenzen und Kataloghinweise gemeinsam. Jede gedruckte Unklarheit bleibt sichtbar und muss mit TransANT bestätigt werden.",
  "TransANT product information and contact details for its freight and tank wagon range.":
    "Produktinformationen und Kontaktdaten zum TransANT-Programm an Güter- und Kesselwagen.",
  "TransANT freight and tank wagon product information":
    "Produktinformationen zu TransANT-Güter- und Kesselwagen",
  "The supplied TransANT catalogue presents ten wagon configurations across intermodal, flat, timber, open-box, and tank families.":
    "Der bereitgestellte TransANT-Katalog stellt zehn Konfigurationen aus den Familien Intermodal, Flachwagen, Holz, offener Kasten und Kesselwagen vor.",
  "Five wagon families": "Fünf Wagenfamilien",
  "Ten catalogue models": "Zehn Katalogmodelle",
  "Model-specific technical data": "Modellspezifische technische Daten",
  "Model-specific information for transport requirements":
    "Modellspezifische Informationen für Transportanforderungen",
  "Each catalogue entry presents typical commodities, key benefits, technical specifications, load limits, and special features for one wagon model. Contact TransANT to discuss the relevant configuration for a transport task.":
    "Jeder Katalogeintrag stellt typische Güter, zentrale Vorteile, technische Spezifikationen, Lastgrenzen und besondere Merkmale eines Wagenmodells vor. Kontaktieren Sie TransANT, um die passende Konfiguration für eine Transportaufgabe zu besprechen.",
  "Built for intensive industrial use, the wagon has a robust body for demanding loading conditions and heavy-duty operation. The open-top configuration and convenient side doors support fast, flexible loading and unloading.":
    "Für den intensiven Industrieeinsatz besitzt der Wagen einen robusten Aufbau für anspruchsvolle Ladebedingungen und Schwerlastbetrieb. Die offene Bauweise und die praktischen Seitentüren unterstützen schnelles, flexibles Be- und Entladen.",
  "Robust construction for demanding loading conditions":
    "Robuste Konstruktion für anspruchsvolle Ladebedingungen",
  "Body for demanding bulk-cargo operation":
    "Aufbau für anspruchsvollen Schüttgutbetrieb",
  "InnoTrans 2026 // International trade fair":
    "InnoTrans 2026 // Internationale Fachmesse",
  "Meet TransANT in Berlin": "Treffen Sie TransANT in Berlin",
  "Visit TransANT at InnoTrans 2026 and discover how modular freight-wagon platforms and cargo-specific superstructures support individual transport tasks.":
    "Besuchen Sie TransANT auf der InnoTrans 2026 und entdecken Sie, wie modulare Güterwagenplattformen und ladungsspezifische Aufbauten individuelle Transportaufgaben unterstützen.",
  "22–25 September 2026": "22.–25. September 2026",
  "Visit us at InnoTrans": "Besuchen Sie uns auf der InnoTrans",
  " (opens in new tab)": " (wird in einem neuen Tab geöffnet)",
  "Freight wagons for individual transport tasks":
    "Güterwagen für individuelle Transportaufgaben",
  "TransANT develops freight and tank wagons from a modular platform and cargo-specific superstructures.":
    "TransANT entwickelt Güter- und Kesselwagen auf einer modularen Plattform mit ladungsspezifischen Aufbauten.",
  "Rail freight engineering": "Engineering für den Schienengüterverkehr",
  "Wagons built for ": "Wagen für ",
  "more useful": "nützlichere",
  " payload.": " Ladung.",
  "TransANT develops freight and tank wagons for individual transport tasks, combining a standardised platform with cargo-specific superstructures.":
    "TransANT entwickelt Güter- und Kesselwagen für individuelle Transportaufgaben und verbindet eine standardisierte Plattform mit ladungsspezifischen Aufbauten.",
  "TransANT develops freight and tank wagons by combining a standardised lightweight platform with cargo-specific superstructures.":
    "TransANT entwickelt Güter- und Kesselwagen, indem eine standardisierte Leichtbauplattform mit ladungsspezifischen Aufbauten kombiniert wird.",
  "Explore wagon families": "Wagenfamilien entdecken",
  "Explore the technology": "Technologie entdecken",
  "Choose by transport task": "Nach Transportaufgabe auswählen",
  "Wagon families": "Wagenfamilien",
  "Matching wagon families to cargo and loading needs.":
    "Wagenfamilien passend zu Ladung und Ladeanforderungen auswählen.",
  "Compare configurations on each family page.":
    "Vergleichen Sie die Konfigurationen auf den jeweiligen Familienseiten.",
  "Engineering value": "Engineering mit Mehrwert",
  "A platform shaped around the transport task":
    "Eine Plattform für die Transportaufgabe",
  "A platform engineered around cargo and operation":
    "Eine Plattform, entwickelt für Ladung und Betrieb",
  "A standardised platform is combined with an industry-specific or customer-specific superstructure.":
    "Eine standardisierte Plattform wird mit einem branchen- oder kundenspezifischen Aufbau kombiniert.",
  "A standardised lightweight platform is combined with an industry- or customer-specific superstructure.":
    "Eine standardisierte Leichtbauplattform wird mit einem branchen- oder kundenspezifischen Aufbau kombiniert.",
  "Topology optimisation": "Topologieoptimierung",
  "Material is placed where it is required to transmit load.":
    "Material wird dort eingesetzt, wo es zur Lastübertragung erforderlich ist.",
  "Modular superstructures": "Modulare Aufbauten",
  "The superstructure is selected for the industry and cargo.":
    "Der Aufbau wird für Branche und Ladung ausgewählt.",
  "Shared platform architecture": "Gemeinsame Plattformarchitektur",
  "Common platform parts support variants in different lengths and configurations.":
    "Gemeinsame Plattformteile unterstützen Varianten in unterschiedlichen Längen und Konfigurationen.",
  "Interchangeable superstructures": "Austauschbare Aufbauten",
  "The superstructure can be selected or exchanged for the intended cargo and operation.":
    "Der Aufbau kann für die vorgesehene Ladung und den Betrieb ausgewählt oder ausgetauscht werden.",
  "Five families. Engineered around the load.":
    "Fünf Familien. Entwickelt für die Ladung.",
  "From containers and steel to timber, bulk materials and liquids, each TransANT wagon family is developed around a specific transport task.":
    "Von Containern und Stahl bis zu Holz, Schüttgut und Flüssigkeiten wird jede TransANT-Wagenfamilie für eine konkrete Transportaufgabe entwickelt.",
  Intermodal: "Intermodal",
  Flat: "Flachwagen",
  Timber: "Holz",
  "Multi / Open box": "Multi / Offener Kasten",
  Tank: "Kesselwagen",
  "Containers & swap bodies": "Container und Wechselbehälter",
  "Steel & long cargo": "Stahl und Langgut",
  "Roundwood & timber": "Rundholz und Holz",
  "Scrap & bulk materials": "Schrott und Schüttgut",
  "Liquid chemicals & fuels": "Flüssige Chemikalien und Kraftstoffe",
  "Intermodal wagons for flexible transport of 20/30/40ft ISO containers and swap bodies, with multiple loading configurations.":
    "Intermodalwagen für den flexiblen Transport von 20-, 30- und 40-ft-ISO-Containern und Wechselbehältern mit mehreren Ladekonfigurationen.",
  "Versatile flat wagons with foldable side walls, swivel stanchions and robust wooden floors for steel, construction materials and long, bulky or project cargo.":
    "Vielseitige Flachwagen mit klappbaren Seitenwänden, schwenkbaren Rungen und robusten Holzböden für Stahl, Baumaterialien sowie langes, sperriges oder projektbezogenes Ladegut.",
  "High-capacity timber wagons engineered for 3, 4 and 5 m logs, with optimized stanchions that retain roundwood securely without additional tying.":
    "Leistungsfähige Holzwagen für 3-, 4- und 5-m-Stämme mit optimierten Rungen, die Rundholz ohne zusätzliche Verzurrung sicher halten.",
  "High-wall open-box wagons from 33 to 56 ft, with an exceptional payload-to-tare ratio and full-length side doors for fast, flexible loading of scrap and bulk.":
    "Offene Hochbordwagen von 33 bis 56 ft mit einem hohen Nutzlast-Eigengewichts-Verhältnis und durchgehenden Seitentüren für schnelles, flexibles Laden von Schrott und Schüttgut.",
  "High-capacity tank wagons for chemical, petrochemical and petroleum products, engineered to RID, TSI, GCU, EN and UIC requirements.":
    "Leistungsfähige Kesselwagen für chemische, petrochemische und Mineralölprodukte, entwickelt nach den Anforderungen von RID, TSI, GCU, EN und UIC.",
  "Explore Intermodal": "Intermodal entdecken",
  "Explore Flat": "Flachwagen entdecken",
  "Explore Timber": "Holzwagen entdecken",
  "Explore Multi / Open box": "Multi / Offener Kasten entdecken",
  "Explore Tank": "Kesselwagen entdecken",
  "20/30/40ft ISO containers and swap bodies":
    "20/30/40-ft-ISO-Container und Wechselbehälter",
  "Foldable side walls and swivel stanchions":
    "Klappbare Seitenwände und schwenkbare Rungen",
  "3, 4 and 5 m logs": "3-, 4- und 5-m-Stämme",
  "Chemical, petrochemical and petroleum products":
    "Chemische, petrochemische und Mineralölprodukte",
  "Modular platform": "Modulare Plattform",
  "From platform to transport task": "Von der Plattform zur Transportaufgabe",
  "A standardised platform is paired with a cargo-specific superstructure, followed by engineering, homologation, and production.":
    "Eine standardisierte Plattform wird mit einem ladungsspezifischen Aufbau kombiniert, gefolgt von Engineering, Homologation und Produktion.",
  "A standardised platform and cargo-specific superstructure are configured for the operating requirement, then engineered, approved, and coordinated into production.":
    "Eine standardisierte Plattform und ein ladungsspezifischer Aufbau werden für die Betriebsanforderung konfiguriert, anschließend konstruiert, zugelassen und in die Produktion überführt.",
  Platform: "Plattform",
  "Start with a standardised lightweight platform.":
    "Ausgangspunkt ist eine standardisierte Leichtbauplattform.",
  "Select the platform length, loading gauge, and equipment for the intended operation.":
    "Plattformlänge, Lademaß und Ausrüstung werden für den vorgesehenen Betrieb ausgewählt.",
  Superstructure: "Aufbau",
  "Select a structure for the intended industry and cargo.":
    "Der Aufbau wird für die vorgesehene Branche und Ladung ausgewählt.",
  "Pair the platform with an industry- or cargo-specific interchangeable body.":
    "Die Plattform wird mit einem branchen- oder ladungsspezifischen austauschbaren Aufbau kombiniert.",
  Homologation: "Homologation",
  "Prepare the wagon for the applicable approval process.":
    "Der Wagen wird für das anzuwendende Zulassungsverfahren vorbereitet.",
  "Engineering & approval": "Engineering und Zulassung",
  "Complete calculation, design, documentation, and applicable homologation.":
    "Berechnung, Konstruktion, Dokumentation und die anwendbare Homologation werden abgeschlossen.",
  "Managed production": "Gesteuerte Produktion",
  "Coordinate production through the partner network.":
    "Die Produktion wird über das Partnernetzwerk koordiniert.",
  "Coordinated production": "Koordinierte Produktion",
  "Coordinate sourcing and production through the partner network.":
    "Beschaffung und Produktion werden über das Partnernetzwerk koordiniert.",
  "Ore transport": "Erztransport",
  "Erzberg–Linz ore transport": "Erztransport Erzberg–Linz",
  "The TransANT Product Portfolio describes the BulkBox application for ore transport between Erzberg and Linz, with potential savings of up to 100 train journeys per year for this application.":
    "Das TransANT-Produktportfolio beschreibt die BulkBox-Anwendung für den Erztransport zwischen Erzberg und Linz mit einem möglichen Einsparpotenzial von bis zu 100 Zugfahrten pro Jahr für diese Anwendung.",
  Route: "Route",
  "Potential annual saving": "Mögliche jährliche Einsparung",
  "Up to 100 avoided train journeys per year":
    "Bis zu 100 vermiedene Zugfahrten pro Jahr",
  "Explore the project": "Projekt entdecken",
  "Contact TransANT": "TransANT kontaktieren",
  "Technology platform": "Technologieplattform",
  "Freight wagon technology": "Güterwagentechnologie",
  "How TransANT combines a standardised lightweight platform, interchangeable cargo-specific superstructures, and configuration-led engineering.":
    "Wie TransANT eine standardisierte Leichtbauplattform, austauschbare ladungsspezifische Aufbauten und konfigurationsbezogenes Engineering verbindet.",
  "Freight wagon engineering": "Güterwagen-Engineering",
  "Transport requirements": "Transportanforderungen",
  "Engineering begins with the operating requirement":
    "Engineering beginnt mit der Betriebsanforderung",
  "Cargo, route, loading method, terminal conditions, and the intended operation shape the platform, superstructure, and equipment.":
    "Ladung, Strecke, Lademethode, Terminalbedingungen und der vorgesehene Betrieb bestimmen Plattform, Aufbau und Ausrüstung.",
  "A freight wagon starts with the transport task":
    "Ein Güterwagen beginnt mit der Transportaufgabe",
  "TransANT combines a standardised platform with an industry-specific or customer-specific superstructure for the intended cargo and operation.":
    "TransANT verbindet eine standardisierte Plattform mit einem branchen- oder kundenspezifischen Aufbau für die vorgesehene Ladung und den vorgesehenen Betrieb.",
  "Platform concept": "Plattformkonzept",
  "Platform architecture": "Plattformarchitektur",
  "One platform concept, multiple configurations":
    "Ein Plattformkonzept, mehrere Konfigurationen",
  "The standardised lightweight platform architecture is available in different lengths and loading gauges, while common parts are shared across variants.":
    "Die standardisierte Leichtbau-Plattformarchitektur ist in unterschiedlichen Längen und Lademaßen verfügbar, während gemeinsame Teile über Varianten hinweg genutzt werden.",
  "The standardised lightweight platform architecture is available in different lengths and loading gauges, providing the basis for industry- or customer-specific superstructures.":
    "Die standardisierte Leichtbau-Plattformarchitektur ist in unterschiedlichen Längen und Lademaßen verfügbar und bildet die Grundlage für branchen- oder kundenspezifische Aufbauten.",
  "View the TransANT product portfolio": "TransANT-Produktportfolio ansehen",
  "Standardise the foundation, adapt the superstructure":
    "Die Grundlage standardisieren, den Aufbau anpassen",
  "Engineering sequence": "Engineering-Ablauf",
  "Adapt the body when logistics requirements change":
    "Den Aufbau an veränderte Logistikanforderungen anpassen",
  "Industry- or customer-specific superstructures are paired with the platform for the intended cargo. The modular concept allows bodies to be exchanged; without a body, suitable platform wagons can be used for intermodal container transport.":
    "Branchen- oder kundenspezifische Aufbauten werden für die vorgesehene Ladung mit der Plattform kombiniert. Das modulare Konzept ermöglicht den Austausch der Aufbauten; ohne Aufbau können geeignete Plattformwagen für den intermodalen Containertransport eingesetzt werden.",
  "Common platform parts are used across variants. Industry- or customer-specific superstructures are paired with the platform for the intended cargo and can be exchanged; without a body, suitable platform wagons can be used for intermodal container transport.":
    "Gemeinsame Plattformteile werden über Varianten hinweg genutzt. Branchen- oder kundenspezifische Aufbauten werden für die vorgesehene Ladung mit der Plattform kombiniert und können ausgetauscht werden; ohne Aufbau können geeignete Plattformwagen für den intermodalen Containertransport eingesetzt werden.",
  "Read the Rail Cargo Group platform overview":
    "Plattformübersicht der Rail Cargo Group lesen",
  "Lightweight engineering": "Leichtbau-Engineering",
  "Use material where the load requires it":
    "Material dort einsetzen, wo die Last es erfordert",
  "Configuration and readiness": "Konfiguration und Bereitschaft",
  "Confirm equipment and DAC readiness for the selected wagon":
    "Ausrüstung und DAK-Bereitschaft für den ausgewählten Wagen bestätigen",
  "Platform length, loading gauge, equipment, and readiness for digital automatic coupling depend on the model and intended operation. Applicable requirements and approvals must be confirmed for the selected configuration.":
    "Plattformlänge, Lademaß, Ausrüstung und Bereitschaft für die digitale automatische Kupplung hängen vom Modell und dem vorgesehenen Betrieb ab. Anwendbare Anforderungen und Zulassungen müssen für die ausgewählte Konfiguration bestätigt werden.",
  "Engineering and delivery": "Engineering und Umsetzung",
  "Move from requirements to approval and production":
    "Von Anforderungen zu Zulassung und Produktion",
  "Cargo, route, loading method, terminal technology, and customer requirements inform platform and body selection. Calculation, design, documentation, applicable homologation, and coordinated partner production follow.":
    "Ladung, Strecke, Lademethode, Terminaltechnik und Kundenanforderungen bestimmen die Auswahl von Plattform und Aufbau. Darauf folgen Berechnung, Konstruktion, Dokumentation, anwendbare Homologation und koordinierte Partnerproduktion.",
  "From cargo requirements to homologation":
    "Von den Ladungsanforderungen zur Homologation",
  "The process begins with cargo, route, terminal technology, and customer requirements, then moves through platform selection, engineering design, homologation, and coordination with production partners.":
    "Der Prozess beginnt mit Ladung, Strecke, Terminaltechnik und Kundenanforderungen und führt über Plattformauswahl, Engineering, Homologation und die Koordination mit Produktionspartnern.",
  "Discuss the transport task before selecting a configuration":
    "Besprechen Sie die Transportaufgabe vor der Auswahl einer Konfiguration",
  "Discuss your wagon requirements": "Besprechen Sie Ihre Wagenanforderungen",
  "Bring the cargo, route, loading method, terminal conditions, and intended operation to the first technical conversation.":
    "Bringen Sie Ladung, Strecke, Lademethode, Terminalbedingungen und den vorgesehenen Betrieb in das erste technische Gespräch ein.",
  "Discuss wagon requirements": "Wagenanforderungen besprechen",
  "Bring the cargo, route, terminal, and operating requirement to the first technical conversation.":
    "Bringen Sie Ladung, Strecke, Terminal und Betriebsanforderungen in das erste technische Gespräch ein.",
  "Browse wagon families": "Wagenfamilien durchsuchen",
  "Projects and references": "Projekte und Referenzen",
  "BulkBox for Erzberg–Linz ore transport":
    "BulkBox für den Erztransport Erzberg–Linz",
  "The TransANT Product Portfolio presents BulkBox for ore transport between Erzberg and Linz.":
    "Das TransANT-Produktportfolio stellt die BulkBox für den Erztransport zwischen Erzberg und Linz vor.",
  "Your transport task": "Ihre Transportaufgabe",
  "Discuss the requirements of your route":
    "Besprechen Sie die Anforderungen Ihrer Strecke",
  "Cargo, route, and loading conditions shape the wagon configuration. Contact TransANT to discuss the requirements of a comparable transport task.":
    "Ladung, Strecke und Ladebedingungen bestimmen die Wagenkonfiguration. Kontaktieren Sie TransANT, um die Anforderungen einer vergleichbaren Transportaufgabe zu besprechen.",
  "Discuss a comparable transport task":
    "Eine vergleichbare Transportaufgabe besprechen",
  "A useful enquiry starts with the cargo, route, operating constraints, and the evidence needed for the proposed configuration.":
    "Eine zielführende Anfrage beginnt mit Ladung, Strecke, betrieblichen Rahmenbedingungen und den für die vorgeschlagene Konfiguration erforderlichen Nachweisen.",
  "Discuss a transport task": "Transportaufgabe besprechen",
  Company: "Unternehmen",
  "Engineering freight wagons for the European standard-gauge market":
    "Engineering für Güterwagen im europäischen Regelspurnetz",
  "TransAnt GmbH develops, homologates, and distributes freight and tank wagons; manufacturing and supply are organised through a partner network.":
    "TransAnt GmbH entwickelt, homologiert und vertreibt Güter- und Kesselwagen; Fertigung und Versorgung werden über ein Partnernetzwerk organisiert.",
  "Partner model": "Partnermodell",
  "Engineering and production partners": "Engineering- und Produktionspartner",
  "Homologation and distribution": "Homologation und Vertrieb",
  "Linz, Austria": "Linz, Österreich",
  "TransANT brings together the expertise of voestalpine Stahl GmbH, TAS Group, and ÖBB Rail Cargo Group. Manufacturing and supply are organised through a partner network.":
    "TransANT verbindet die Expertise der voestalpine Stahl GmbH, der TAS Group und der ÖBB Rail Cargo Group. Fertigung und Versorgung werden über ein Partnernetzwerk organisiert.",
  "Company information": "Unternehmensinformationen",
  "Factual reference": "Sachangabe",
  "An Austrian limited-liability company registered as FN 544665 d on 1 December 2020.":
    "Eine österreichische Gesellschaft mit beschränkter Haftung, eingetragen als FN 544665 d am 1. Dezember 2020.",
  "Talk with the TransANT team about a transport task":
    "Sprechen Sie mit dem TransANT-Team über eine Transportaufgabe",
  "Contact TransANT with the technical and operational context that matters to the wagon decision.":
    "Kontaktieren Sie TransANT mit dem technischen und betrieblichen Kontext, der für die Wagenentscheidung relevant ist.",
  Quality: "Qualität",
  "View the scope, issuer, and validity details of the quality management and railway vehicle welding certificates.":
    "Sehen Sie Geltungsbereich, Aussteller und Gültigkeitsdetails der Zertifikate für Qualitätsmanagement und das Schweißen von Schienenfahrzeugen.",
  Certification: "Zertifizierung",
  "Quality management and railway vehicle welding":
    "Qualitätsmanagement und Schweißen von Schienenfahrzeugen",
  "ISO 9001:2015 covers the development, homologation, and distribution of freight and tank wagons. EN 15085-2 addresses railway vehicle and component welding. Open each certificate for its full scope and conditions.":
    "ISO 9001:2015 umfasst die Entwicklung, Homologation und den Vertrieb von Güter- und Kesselwagen. EN 15085-2 betrifft das Schweißen von Schienenfahrzeugen und Komponenten. Öffnen Sie die Zertifikate für den vollständigen Geltungsbereich und die Bedingungen.",
  Certificates: "Zertifikate",
  Date: "Datum",
  Issuer: "Aussteller",
  Scope: "Geltungsbereich",
  "Find the documentation for your project":
    "Die Dokumentation für Ihr Projekt finden",
  "Contact TransANT to discuss certificate scope or documentation for a particular wagon configuration.":
    "Kontaktieren Sie TransANT, um den Zertifikatsumfang oder die Dokumentation für eine bestimmte Wagenkonfiguration zu besprechen.",
  "View certificates": "Zertifikate ansehen",
  Home: "Startseite",
  Wagons: "Wagen",
  "Container transport": "Containertransport",
  "Steel, timber, oversized": "Stahl, Holz, übergroße Ladung",
  "Roundwood & sawn timber": "Rundholz und Schnittholz",
  "Scrap & bulk cargo": "Schrott und Schüttgut",
  "Liquid bulk": "Flüssige Güter",
  "intermodal wagon family": "Intermodal-Wagenfamilie",
  "Intermodal wagons": "Intermodalwagen",
  "Intermodal models": "Intermodalmodelle",
  "Source-listed cargo": "Quellenseitig genannte Ladung",
  "Maritime containers": "Seefrachtcontainer",
  "Swap bodies": "Wechselbehälter",
  "Intermodal freight units": "Intermodale Ladeeinheiten",
  "Flexible intermodal transport with optimized payload capacity.":
    "Flexibler Intermodaltransport mit optimierter Nutzlastkapazität.",
  "View Intermodal wagons": "Intermodalwagen ansehen",
  "View Flat wagons": "Flachwagen ansehen",
  "View Timber wagons": "Holzwagen ansehen",
  "View Multi / Open box wagons": "Multi-/Offene-Kasten-Wagen ansehen",
  "View Tank wagons": "Kesselwagen ansehen",
  "Collaboration process": "Zusammenarbeit",
  "From transport task to a wagon concept":
    "Von der Transportaufgabe zum Wagenkonzept",
  "Start with your transport requirements, then work through engineering, homologation, and managed production.":
    "Ausgangspunkt sind Ihre Transportanforderungen, danach folgen Engineering, Homologation und gesteuerte Produktion.",
  "Understand the task": "Aufgabe verstehen",
  "Frame the transport requirement and cargo context.":
    "Transportanforderung und Ladungskontext werden definiert.",
  "Develop the wagon": "Wagen entwickeln",
  "Combine platform and superstructure for the intended use.":
    "Plattform und Aufbau werden für den vorgesehenen Einsatz kombiniert.",
  "Homologate and coordinate": "Homologieren und koordinieren",
  "Prepare approvals and manage production with partners.":
    "Zulassungen werden vorbereitet und die Produktion mit Partnern gesteuert.",
  "Support the next step": "Nächsten Schritt begleiten",
  "Continue the discussion with the transport requirement in view.":
    "Das Gespräch wird mit Blick auf die Transportanforderung fortgesetzt.",
  "Quality and certification": "Qualität und Zertifizierung",
  "Quality standards and certificates": "Qualitätsstandards und Zertifikate",
  "View the certificate details for quality management and railway vehicle welding.":
    "Hier finden Sie die Zertifikatsdetails für Qualitätsmanagement und das Schweißen von Schienenfahrzeugen.",
  "The documented scope covers development, homologation, and distribution of freight and tank wagons.":
    "Der dokumentierte Geltungsbereich umfasst Entwicklung, Homologation und Vertrieb von Güter- und Kesselwagen.",
  "Open ISO 9001 certificate": "ISO-9001-Zertifikat öffnen",
  "The documented certificate identifies classification level CL1 and activity types D and S.":
    "Das dokumentierte Zertifikat weist die Klassifizierungsstufe CL1 sowie die Tätigkeitstypen D und S aus.",
  "Open EN 15085 certificate": "EN-15085-Zertifikat öffnen",
  "Development, homologation, and distribution of freight and tank wagons.":
    "Entwicklung, Homologation und Vertrieb von Güter- und Kesselwagen.",
  "EN 15085-2:2020+A1:2023, classification level CL1; activity types D and S.":
    "EN 15085-2:2020+A1:2023, Klassifizierungsstufe CL1; Tätigkeitstypen D und S.",
  "Discuss your transport requirements":
    "Besprechen Sie Ihre Transportanforderungen",
  "Start with the cargo, route, and operating requirement so the next conversation has a useful technical context.":
    "Beginnen Sie mit Ladung, Route und Betriebsanforderungen, damit das nächste Gespräch einen nützlichen technischen Kontext hat.",
  "Learn about TransANT": "TransANT kennenlernen",
  "Wagon catalogue": "Wagenkatalog",
  "Freight wagon catalogue": "Güterwagenkatalog",
  "Freight wagon families": "Güterwagenfamilien",
  "Browse TransANT wagon families by the transport task they serve.":
    "Durchsuchen Sie die TransANT-Güterwagenfamilien nach ihrer jeweiligen Transportaufgabe.",
  "Browse the TransANT wagon range directly by the transport task it serves.":
    "Entdecken Sie das TransANT-Wagenangebot direkt nach der jeweiligen Transportaufgabe.",
  Catalogue: "Katalog",
  "Freight wagons for every transport task":
    "Güterwagen für jede Transportaufgabe",
  "Browse five wagon families and their available models.":
    "Entdecken Sie fünf Wagenfamilien und ihre verfügbaren Modelle.",
  "Find the right wagon family": "Die passende Wagenfamilie finden",
  "Explore models grouped by cargo and transport task.":
    "Entdecken Sie Modelle, geordnet nach Ladung und Transportaufgabe.",
};

export function translateGermanContent<T>(value: T): T {
  return translateTree(value) as T;
}

function translateTree(value: unknown, key?: string): unknown {
  if (typeof value === "string") {
    if (
      (key === "href" || key === "homeHref" || key === "currentPath") &&
      value.startsWith("/")
    ) {
      return localizedPath("de", value);
    }
    const directTranslation = germanCopy[value];
    if (directTranslation) return directTranslation;
    if (value.startsWith("View ")) return `${value.slice(5)} ansehen`;
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => translateTree(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        translateTree(entryValue, entryKey),
      ]),
    );
  }
  return value;
}

const translatedHomepage = translateGermanContent(homepageViewModel);

export const germanHomepageViewModel: HomepageViewModel = {
  ...translatedHomepage,
  contactCta: {
    ...translatedHomepage.contactCta,
    labels: {
      context: "Anfragekontext",
      supportingNavigation: "Ähnliche Kontaktoptionen",
    },
  },
  layout: createSiteLayout(
    "Güterwagen für individuelle Transportaufgaben",
    "Der TransANT-Produktkatalog stellt Intermodal-, Flach-, Holz-, offene Kasten- und Kesselwagen für definierte Transportaufgaben vor.",
    "/",
    "de",
  ),
};
