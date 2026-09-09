import type { HomepageViewModel } from "./homepage-view-model";
import { homepageViewModel } from "./homepage-view-model";
import { createSiteLayout, localizedPath } from "./site-shell-view-model";

export const germanCopy: Readonly<Record<string, string>> = {
  "Engineering solutions for European rail freight":
    "Ingenieurlösungen für den europäischen Schienengüterverkehr",
  "TransAnt GmbH // Linz, Austria": "TransAnt GmbH // Linz, Österreich",
  "PART OF TAS GROUP": "PART OF TAS GROUP",
  "Engineering solutions for ": "Ingenieurlösungen für den ",
  "European rail freight.": "europäischen Schienengüterverkehr.",
  "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020. We develop, market and support freight-wagon solutions for Europe’s standard-gauge network, coordinating requirements, engineering, certification and industrial delivery.":
    "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group und wurde 2020 in Linz gegründet. Wir entwickeln, vermarkten und betreuen Güterwagenlösungen für das europäische Normalspurnetz und koordinieren Anforderungen, Engineering, Zertifizierung und industrielle Umsetzung.",
  "Explore wagons": "Wagen entdecken",
  "About TransAnt": "Über TransAnt",
  "The TransANT name cut into the red frame of a freight wagon":
    "Der in den roten Rahmen eines Güterwagens eingeschnittene TransANT-Schriftzug",
  "How TransAnt works": "So arbeitet TransAnt",
  "From transport task to delivered wagon":
    "Von der Transportaufgabe zum ausgelieferten Wagen",
  "Work on a wagon starts not with choosing a standard model, but with understanding the real transport task. We analyse the cargo carried, routes, permissible axle loads, gauges, loading and unloading methods, terminal infrastructure, operating intensity, and the requirements of the future owner or operator. Based on this information, TransAnt identifies a suitable wagon configuration or develops a solution adapted to the specific operating conditions.":
    "Die Arbeit an einem Wagen beginnt nicht mit der Wahl eines Standardmodells, sondern mit dem Verständnis der tatsächlichen Transportaufgabe. Wir analysieren die zu befördernde Ladung, die Strecken, zulässige Achslasten, Lichtraumprofile, Be- und Entladeverfahren, Terminalinfrastruktur, die Betriebsintensität sowie die Anforderungen des künftigen Eigentümers oder Betreibers. Auf dieser Grundlage bestimmt TransAnt eine passende Wagenkonfiguration oder entwickelt eine Lösung, die an die konkreten Einsatzbedingungen angepasst ist.",
  "Analyse the transport task": "Transportaufgabe analysieren",
  "We assess cargo, volumes, routes, infrastructure constraints, loading and unloading, and the customer’s operating requirements.":
    "Wir bewerten Ladung, Transportvolumen, Routen, infrastrukturelle Einschränkungen, Be- und Entladung sowie die Betriebsanforderungen des Kunden.",
  "Define the concept": "Konzept definieren",
  "We select the wagon type, core parameters, loading scheme, equipment and configuration for the intended use.":
    "Wir bestimmen Wagentyp, Hauptparameter, Ladeschema, Ausrüstung und Konfiguration für den vorgesehenen Einsatz.",
  "Engineer and approve": "Konstruieren und zulassen",
  "Design, calculations, modelling, load verification, technical documentation, prototype testing and conformity assessment prepare the solution for the European market.":
    "Konstruktion, Berechnungen, Modellierung, Lastnachweise, technische Dokumentation, Prototypenprüfungen und Konformitätsbewertung bereiten die Lösung für den europäischen Markt vor.",
  "Coordinate delivery": "Umsetzung und Lieferung koordinieren",
  "TransAnt aligns qualified manufacturing partners, production preparation, wagon delivery and ongoing technical support.":
    "TransAnt koordiniert qualifizierte Fertigungspartner, Produktionsvorbereitung, Wagenauslieferung und die weitere technische Betreuung.",
  "TransAnt project stages": "Projektphasen bei TransAnt",
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
  "Drawings & technical data": "Zeichnungen und technische Daten",
  "Wagon in detail": "Wagen im Detail",
  "View full size": "In Originalgröße ansehen",
  "Open drawing": "Zeichnung öffnen",
  "with source dimensions": "mit Abmessungen aus der Quelle",
  "Not specified in source": "In der Quelle nicht angegeben",
  "Source notes": "Quellenhinweise",
  "Overall dimensions": "Hauptabmessungen",
  "Loading scheme": "Beladungsschema",
  "PRO INTERMODAL 60 ft technical sheet · pp. 1–2":
    "Technisches Datenblatt PRO INTERMODAL 60 ft · S. 1–2",
  "Product sections": "Produktbereiche",
  "Read the catalogue entry as one model-specific record":
    "Den Katalogeintrag als einen modellspezifischen Datensatz lesen",
  "Use the wagon render, technical drawings, specification tables, loading limits, and catalogue notes together. Any printed ambiguity remains visible and requires confirmation with TransANT.":
    "Nutzen Sie Wagenabbildung, technische Zeichnungen, Spezifikationstabellen, Lastgrenzen und Kataloghinweise gemeinsam. Jede gedruckte Unklarheit bleibt sichtbar und muss mit TransANT bestätigt werden.",
  "TransANT product information and contact details for its freight and tank wagon range.":
    "Produktinformationen und Kontaktdaten zum TransANT-Programm an Güter- und Kesselwagen.",
  "TransANT freight and tank wagon product information":
    "Produktinformationen zu TransANT-Güter- und Kesselwagen",
  "About TransAnt GmbH": "Über TransAnt GmbH",
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
  "Up to 70 t with concentrated loads: distributed over 10 m of loading length or on two points across a 6,5 m section.":
    "Bis zu 70 t bei konzentrierter Belastung: über 10 m Ladelänge verteilt oder auf zwei Punkten in einem 6,5-m-Abschnitt.",
  "Distributed over the loading length": "Über die Ladelänge verteilt",
  "Distributed on two points": "Auf zwei Punkten verteilt",
  "InnoTrans 2026 // International trade fair":
    "InnoTrans 2026 // Internationale Fachmesse",
  "Meet TransANT in Berlin": "Treffen Sie TransANT in Berlin",
  "Visit TransANT at InnoTrans 2026 and discover how modular freight-wagon platforms and cargo-specific superstructures support individual transport tasks.":
    "Besuchen Sie TransANT auf der InnoTrans 2026 und entdecken Sie, wie modulare Güterwagenplattformen und ladungsspezifische Aufbauten individuelle Transportaufgaben unterstützen.",
  "22–25 September 2026": "22.–25. September 2026",
  "Messe Berlin · Outdoor Display": "Messe Berlin · Freigelände",
  "Visit us at InnoTrans": "Besuchen Sie uns auf der InnoTrans",
  "Outdoor Display positions": "Positionen im Freigelände",
  "Find TransANT at four positions": "TransANT an vier Positionen finden",
  "Official InnoTrans hall-plan links":
    "Links zum offiziellen InnoTrans-Hallenplan",
  "Main display": "Hauptstand",
  "Additional position": "Weiterer Standort",
  "Open O5/55 in the official hall plan":
    "O5/55 im offiziellen Hallenplan öffnen",
  "Open T5/50 in the official hall plan":
    "T5/50 im offiziellen Hallenplan öffnen",
  "Open T5/55 in the official hall plan":
    "T5/55 im offiziellen Hallenplan öffnen",
  "Open T5/60 in the official hall plan":
    "T5/60 im offiziellen Hallenplan öffnen",
  " (opens in new tab)": " (wird in einem neuen Tab geöffnet)",
  "Freight wagons for individual transport tasks":
    "Güterwagen für individuelle Transportaufgaben",
  "TransAnt develops, markets and supports freight wagon solutions and coordinates their industrial implementation with qualified manufacturing partners.":
    "TransAnt entwickelt, vermarktet und betreut Güterwagenlösungen und koordiniert deren industrielle Umsetzung mit qualifizierten Fertigungspartnern.",
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
  "Explore Engineering & Services": "Engineering & Services entdecken",
  "Engineering & Services": "Engineering & Services",
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
  Contact: "Kontakt",
  "Let’s discuss your transport requirements":
    "Lassen Sie uns über Ihre Transportanforderungen sprechen",
  "Tell us about the freight wagon solution you need. We look forward to discussing it with you.":
    "Beschreiben Sie die benötigte Güterwagenlösung. Wir freuen uns darauf, sie mit Ihnen zu besprechen.",
  Name: "Name",
  "Your name": "Ihr Name",
  "Business email": "Geschäftliche E-Mail-Adresse",
  "Use an address where TransANT can respond to this enquiry.":
    "Geben Sie eine Adresse an, unter der TransANT auf diese Anfrage antworten kann.",
  "Your organisation": "Ihr Unternehmen",
  "Transport requirement": "Transportanforderung",
  "Include the cargo, route, operating constraints, and relevant wagon context.":
    "Nennen Sie Ladung, Strecke, betriebliche Rahmenbedingungen und den relevanten Wagenkontext.",
  "Tell us what you are planning.": "Beschreiben Sie Ihr Vorhaben.",
  "I have read the privacy information.":
    "Ich habe die Datenschutzhinweise gelesen.",
  "Privacy information": "Datenschutzhinweise",
  "Your details are handled according to our":
    "Ihre Angaben werden gemäß unseren",
  "Freight wagon enquiry from the TransANT website":
    "Güterwagenanfrage über die TransANT-Website",
  "Continue in email": "In E-Mail fortfahren",
  "This opens your email application with the enquiry prepared. Review and send it from there.":
    "Dadurch wird Ihre E-Mail-Anwendung mit der vorbereiteten Anfrage geöffnet. Prüfen und senden Sie sie dort.",
  "Your email application should open with the enquiry prepared. Review it and send it from there.":
    "Ihre E-Mail-Anwendung sollte sich mit der vorbereiteten Anfrage öffnen. Prüfen und senden Sie sie dort.",
  "When you contact us by email or telephone, we process the information you provide, such as your name, business contact details, company, enquiry and related project information, so that we can respond and, where applicable, take steps before entering into a contract. The website contact form only prepares this information in your chosen email application; the website does not send or store the enquiry.":
    "Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen bereitgestellten Angaben, etwa Name, geschäftliche Kontaktdaten, Unternehmen, Anfrage und zugehörige Projektinformationen, damit wir antworten und gegebenenfalls vorvertragliche Maßnahmen ergreifen können. Das Kontaktformular der Website bereitet diese Angaben lediglich in Ihrer gewählten E-Mail-Anwendung vor; die Website sendet oder speichert die Anfrage nicht.",
  "Website hosting and technical operation":
    "Website-Hosting und technischer Betrieb",
  "We use external hosting and technical service providers to make this website available. When you access the website, technical connection and log data, such as an IP address, time of access, requested resource and browser information, may be processed where necessary to deliver, secure and reliably operate the website.":
    "Für die Bereitstellung dieser Website nutzen wir externe Hosting- und technische Dienstleister. Beim Aufruf der Website können technische Verbindungs- und Protokolldaten, etwa IP-Adresse, Zugriffszeit, angeforderte Ressource und Browserinformationen, verarbeitet werden, soweit dies für die Bereitstellung, Sicherheit und den zuverlässigen Betrieb der Website erforderlich ist.",
  "Personal data connected with website operation is processed in accordance with applicable data-protection law. Service providers are engaged under appropriate data-protection arrangements. Where processing involves a transfer outside the European Economic Area, the applicable legal requirements and transfer safeguards must be observed.":
    "Personenbezogene Daten im Zusammenhang mit dem Betrieb der Website werden nach dem anwendbaren Datenschutzrecht verarbeitet. Dienstleister werden auf Grundlage geeigneter datenschutzrechtlicher Vereinbarungen eingesetzt. Soweit die Verarbeitung eine Übermittlung außerhalb des Europäischen Wirtschaftsraums umfasst, sind die geltenden rechtlichen Anforderungen und Übermittlungsgarantien zu beachten.",
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
  "TransAnt GmbH is an Austrian TAS Group company founded in Linz in 2020. We develop, market, and support freight-wagon solutions for Europe's standard-gauge network.":
    "Die TransAnt GmbH ist ein österreichisches Unternehmen der TAS Group, das 2020 in Linz gegründet wurde. Wir entwickeln, vermarkten und betreuen Güterwagenlösungen für das europäische Normalspurnetz.",
  "TransAnt lettering on a red freight wagon":
    "TransAnt-Schriftzug auf einem roten Güterwagen",
  "Founded in Linz in 2020": "2020 in Linz gegründet",
  "Austrian TAS Group company": "Österreichisches Unternehmen der TAS Group",
  "European standard-gauge network": "Europäisches Normalspurnetz",
  "One coordinated project team": "Ein koordiniertes Projektteam",
  "From transport task to wagon solution":
    "Von der Transportaufgabe zur Wagenlösung",
  "The transport task defines the wagon configuration":
    "Die Transportaufgabe bestimmt die Wagenkonfiguration",
  "We begin with cargo, routes, axle loads, vehicle gauge, loading and unloading methods, terminal infrastructure, operating intensity, and the requirements of operators and wagon owners. This determines the wagon configuration.":
    "Am Anfang stehen Ladung, Strecken, Achslasten, Fahrzeugbegrenzung, Be- und Entladeverfahren, Terminalinfrastruktur, Betriebsintensität sowie die Anforderungen von Betreibern und Wagenhaltern. Daraus ergibt sich die Wagenkonfiguration.",
  "Freight wagon coupling and underframe":
    "Kupplung und Untergestell eines Güterwagens",
  "What TransAnt does": "Was TransAnt leistet",
  "From concept to technical support":
    "Vom Konzept bis zur technischen Betreuung",
  "TransAnt brings together transport-task analysis, concepts and configuration, design and optimisation, testing and certification, preparation for industrial implementation, sales, and technical support.":
    "TransAnt verbindet Transportaufgabenanalyse, Konzepte und Konfiguration, Konstruktion und Optimierung, Tests und Zertifizierung, die Vorbereitung der industriellen Umsetzung, Vertrieb und technische Betreuung.",
  "TransAnt engineers working on wagon development":
    "TransAnt-Ingenieure bei der Entwicklung von Güterwagen",
  "Underframe structure of TransAnt PRO 60-foot Sgns platform wagon":
    "Untergestellstruktur des 60-Fuß-Sgns-Plattformwagens TransAnt PRO",
  "Engineering approach": "Ingenieuransatz",
  "Technical decisions with a practical purpose":
    "Technische Entscheidungen mit praktischem Ziel",
  "Each decision considers payload, tare mass, loading method, usable loading length and volume, cargo-specific adaptation, operating limits, and the economic efficiency of the transport process.":
    "Jede Entscheidung berücksichtigt Nutzlast, Eigengewicht, Ladeverfahren, nutzbare Ladelänge und Ladevolumen, ladungsspezifische Anpassung, Betriebsgrenzen und die Wirtschaftlichkeit des Transportprozesses.",
  "Competences in one project": "Kompetenzen in einem Projekt",
  "A coordinated engineering and commercial team":
    "Ein koordiniertes Ingenieur- und Vertriebsteam",
  "Design and calculations, modelling, certification and conformity, quality, welding and technical documentation, project management, procurement and suppliers, sales, and customer support work as one coordinated team from concept to delivered wagon.":
    "Konstruktion und Berechnung, Modellierung, Zertifizierung und Konformität, Qualität, Schweißtechnik und technische Dokumentation, Projektmanagement, Einkauf und Lieferanten, Vertrieb und Kundenbetreuung arbeiten vom Konzept bis zum gelieferten Wagen als ein koordiniertes Team.",
  "Quality at every stage": "Qualität in jeder Phase",
  "Quality begins before manufacturing": "Qualität beginnt vor der Fertigung",
  "Quality work starts with requirements, calculations, and documentation. Controls cover documents, components, manufacture, testing, and non-conformities; the system is confirmed by ISO 9001, EN 15085, and IQNET.":
    "Qualitätsarbeit beginnt mit Anforderungen, Berechnungen und Dokumentation. Die Kontrollen umfassen Dokumente, Komponenten, Fertigung, Prüfung und Abweichungen; das System ist durch ISO 9001, EN 15085 und IQNET bestätigt.",
  "View Quality & Certificates": "Qualität und Zertifikate ansehen",
  "Part of TAS Group": "Teil der TAS Group",
  "European coordination with group capabilities":
    "Europäische Koordination mit Gruppenkompetenzen",
  "Within TAS Group—a group focused on wagon manufacturing, industrial solutions, and rail logistics—TransAnt is the European engineering and commercial coordinator linking clients, certification bodies, and industrial partners. The customer works with one contact and coordinated project management.":
    "Innerhalb der TAS Group – einer Gruppe mit Schwerpunkt auf Wagenbau, Industrielösungen und Bahnlogistik – ist TransAnt der europäische Ingenieur- und Vertriebskoordinator, der Kunden, Zertifizierungsstellen und Industriepartner verbindet. Der Kunde arbeitet mit einem Ansprechpartner und koordiniertem Projektmanagement.",
  "Product development": "Produktentwicklung",
  "PRO platform projects": "PRO-Plattformprojekte",
  "Implemented lightweight 60-foot PRO-family platform-wagon projects with special structural solutions and high-strength steel.":
    "Realisierte Leichtbauprojekte für 60-Fuß-Plattformwagen der PRO-Familie mit besonderen Konstruktionslösungen und hochfestem Stahl.",
  "Lightweight 60-foot PRO platform projects":
    "Leichte 60-Fuß-Plattformwagenprojekte der PRO-Familie",
  "TransAnt’s experience includes implemented lightweight 60-foot platform-wagon projects in the PRO family, using special structural solutions and high-strength steel.":
    "Die Erfahrung von TransAnt umfasst realisierte Leichtbauprojekte für 60-Fuß-Plattformwagen der PRO-Familie mit besonderen Konstruktionslösungen und hochfestem Stahl.",
  "PRO family": "PRO-Familie",
  "Implemented projects": "Realisierte Projekte",
  "60-foot platforms": "60-Fuß-Plattformen",
  "Lightweight structural design": "Leichte Konstruktion",
  "High-strength steel": "Hochfester Stahl",
  "Implemented PRO projects": "Realisierte PRO-Projekte",
  "Special structural solutions for lightweight platforms":
    "Besondere Konstruktionslösungen für leichte Plattformen",
  "The PRO family brings together lightweight 60-foot platform-wagon projects with special structural solutions and high-strength steel.":
    "Die PRO-Familie verbindet Leichtbauprojekte für 60-Fuß-Plattformwagen mit besonderen Konstruktionslösungen und hochfestem Stahl.",
  "Starting from the transport task": "Ausgehend von der Transportaufgabe",
  "Configure the platform around cargo and operation":
    "Die Plattform auf Ladung und Betrieb ausrichten",
  "Cargo, routes, axle loads, vehicle gauge, loading and unloading methods, terminal infrastructure, operating intensity, and customer requirements define the wagon configuration.":
    "Ladung, Strecken, Achslasten, Fahrzeugbegrenzung, Be- und Entladeverfahren, Terminalinfrastruktur, Betriebsintensität und Kundenanforderungen bestimmen die Wagenkonfiguration.",
  "Engineering objectives": "Engineering-Ziele",
  "Assess the factors that determine transport efficiency":
    "Die Faktoren für die Transporteffizienz bewerten",
  "For a project, TransAnt evaluates payload, tare mass, loading method, usable loading length and volume, cargo-specific adaptation, operating limits, transport-process efficiency, and future technical requirements.":
    "Für ein Projekt bewertet TransAnt Nutzlast, Eigengewicht, Ladeverfahren, nutzbare Ladelänge und Ladevolumen, ladungsspezifische Anpassung, Betriebsgrenzen, die Effizienz des Transportprozesses und künftige technische Anforderungen.",
  "From concept to implementation": "Vom Konzept zur Umsetzung",
  "One coordinated route from concept to delivery":
    "Ein koordinierter Weg vom Konzept bis zur Lieferung",
  "Transport-task analysis, concept and configuration, design and optimisation, testing and certification, industrial implementation, sales, and technical support are coordinated throughout the project.":
    "Transportaufgabenanalyse, Konzept und Konfiguration, Konstruktion und Optimierung, Tests und Zertifizierung, industrielle Umsetzung, Vertrieb und technische Betreuung werden im gesamten Projekt koordiniert.",
  "From PRO experience to the UNO range":
    "Von der PRO-Erfahrung zum UNO-Programm",
  "The next development step is the UNO range: wagon solutions for intermodal transport, metal, timber, bulk cargo, and liquids. Visit the wagon range for model-specific data.":
    "Der nächste Entwicklungsschritt ist das UNO-Programm: Wagenlösungen für intermodale Transporte, Metall, Holz, Schüttgüter und Flüssigkeiten. Besuchen Sie das Wagenprogramm für modellspezifische Daten.",
  "Discuss a PRO platform project": "Ein PRO-Plattformprojekt besprechen",
  "Tell us about the cargo, route, transport volumes, and loading method. The team can assess the requirements and propose an appropriate wagon configuration or development direction.":
    "Teilen Sie uns Ladung, Strecke, Transportvolumen und Ladeverfahren mit. Das Team kann die Anforderungen bewerten und eine passende Wagenkonfiguration oder Entwicklungsrichtung vorschlagen.",
  "Discuss a PRO project": "Ein PRO-Projekt besprechen",
  "Explore PRO platform projects": "PRO-Plattformprojekte entdecken",
  "View all wagons": "Alle Wagen ansehen",
  "Implemented PRO projects for 60-foot platforms":
    "Realisierte PRO-Projekte für 60-Fuß-Plattformen",
  "TransAnt PRO 60-foot platform wagon on track":
    "TransAnt PRO 60-Fuß-Plattformwagen auf dem Gleis",
  "Actual TransAnt PRO 60-foot Sgns platform wagon on track":
    "Tatsächlicher 60-Fuß-Sgns-Plattformwagen TransAnt PRO auf dem Gleis",
  "UNO range": "UNO-Programm",
  "Wagons for current transport tasks": "Wagen für aktuelle Transportaufgaben",
  "The UNO range covers intermodal transport, metal, timber, bulk cargo, and liquids. Visit the wagon range for model-specific data.":
    "Das UNO-Programm umfasst intermodale Transporte, Metall, Holz, Schüttgüter und Flüssigkeiten. Besuchen Sie das Wagenprogramm für modellspezifische Daten.",
  "TransAnt UNO intermodal wagon being transported by road":
    "TransAnt UNO Intermodalwagen beim Straßentransport",
  "View wagons": "Wagen ansehen",
  "Discuss your transport task": "Ihre Transportaufgabe besprechen",
  "The right solution begins with the cargo, route, operating process, and technical requirements.":
    "Die passende Lösung beginnt mit der Ladung, der Strecke, dem Betriebsprozess und den technischen Anforderungen.",
  "Contact TransAnt": "TransAnt kontaktieren",
  "PRO INTERMODAL 60 ft": "PRO INTERMODAL 60 ft",
  "A lightweight four-axle Sgns platform for 20, 30 and 40 ft ISO containers and specialised equipment.":
    "Eine leichte vierachsige Sgns-Plattform für 20-, 30- und 40-Fuß-ISO-Container sowie Spezialausrüstung.",
  "PRO INTERMODAL 60 ft // Sgns": "PRO INTERMODAL 60 ft // Sgns",
  "Lightweight platform for heavy transport tasks":
    "Leichte Plattform für schwere Transportaufgaben",
  "PRO INTERMODAL 60 ft is a four-axle Sgns railway platform for 20, 30 and 40 ft ISO containers and for mounting specialised equipment.":
    "PRO INTERMODAL 60 ft ist eine vierachsige Eisenbahnplattform der Gattung Sgns für 20-, 30- und 40-Fuß-ISO-Container sowie zur Aufnahme von Spezialausrüstung.",
  "A four-axle Sgns platform for 20, 30 and 40 ft ISO containers and specialised equipment, built from high-strength alform® steel with a topologically optimised frame.":
    "Eine vierachsige Sgns-Plattform für 20-, 30- und 40-Fuß-ISO-Container und Spezialausrüstung, gefertigt aus hochfestem alform®-Stahl mit topologisch optimiertem Rahmen.",
  "With a base-platform tare of approximately 16 tonnes, PRO can provide capacity for up to four tonnes of additional cargo compared with a conventional platform of around 20 tonnes, when the route, container or superstructure, and loading scheme permit it.":
    "Mit einem Eigengewicht der Basisplattform von etwa 16 Tonnen kann PRO gegenüber einer konventionellen Plattform von rund 20 Tonnen Kapazität für bis zu vier Tonnen zusätzliche Ladung schaffen, sofern Strecke, Container oder Aufbau und Ladeschema dies zulassen.",
  "Enquire about PRO 60 ft": "Anfrage zu PRO 60 ft senden",
  "Approx. 16 tonnes": "Ca. 16 Tonnen",
  "Base-platform tare without removable ballast.":
    "Eigengewicht der Basisplattform ohne herausnehmbaren Ballast.",
  "Up to 4 tonnes": "Bis zu 4 Tonnen",
  "Potential additional payload compared with conventional platforms weighing around 20 tonnes.":
    "Mögliche zusätzliche Nutzlast gegenüber konventionellen Plattformen mit rund 20 Tonnen Eigengewicht.",
  "Up to 73.5 tonnes": "Bis zu 73,5 Tonnen",
  "Maximum payload on a class D line in the corresponding configuration.":
    "Maximale Nutzlast auf einer Strecke der Klasse D in der entsprechenden Konfiguration.",
  "Approx. 16 t base-platform tare": "Ca. 16 t Eigengewicht der Basisplattform",
  "Up to 4 t additional payload potential":
    "Bis zu 4 t zusätzliche Nutzlast möglich",
  "Up to 73.5 t payload on class D lines":
    "Bis zu 73,5 t Nutzlast auf Streckenklasse D",
  "24 foldable container pins": "24 klappbare Containerzapfen",
  "Lower tare — more payload": "Weniger Eigengewicht — mehr Nutzlast",
  "Approximately 16 tonnes of base-platform tare":
    "Etwa 16 Tonnen Eigengewicht der Basisplattform",
  "High-strength alform® steel and a topologically optimised structure reduce the base platform’s tare to approximately 16 tonnes. Comparable conventional platforms weigh around 20 tonnes.":
    "Hochfester alform®-Stahl und eine topologisch optimierte Konstruktion reduzieren das Eigengewicht der Basisplattform auf etwa 16 Tonnen. Vergleichbare konventionelle Plattformen wiegen rund 20 Tonnen.",
  "The tare difference can create capacity for up to four tonnes of additional cargo per wagon, provided that the railway line class, container or superstructure, and the other transport parameters permit it.":
    "Der Unterschied im Eigengewicht kann Kapazität für bis zu vier Tonnen zusätzliche Ladung je Wagen schaffen, sofern Streckenklasse, Container oder Aufbau und die weiteren Transportparameter dies zulassen.",
  "Maximum payload reaches 73.5 tonnes on a class D line in the corresponding configuration. Actual payload depends on the route class, equipment mass, container characteristics, and selected loading scheme.":
    "Die maximale Nutzlast beträgt in der entsprechenden Konfiguration 73,5 Tonnen auf einer Strecke der Klasse D. Die tatsächliche Nutzlast hängt von Streckenklasse, Ausrüstungsmasse, Containereigenschaften und gewähltem Ladeschema ab.",
  "High-strength lightweight structure": "Hochfeste Leichtbaukonstruktion",
  "Material placed where the frame carries the highest loads":
    "Material dort, wo der Rahmen die höchsten Lasten trägt",
  "The load-bearing structure is made from high-strength alform® steel. Topological optimisation places material in the most highly loaded parts of the frame while reducing its tare.":
    "Die Tragstruktur besteht aus hochfestem alform®-Stahl. Die topologische Optimierung ordnet Material in den am stärksten belasteten Rahmenbereichen an und reduziert zugleich das Eigengewicht.",
  "Low tare mass": "Geringes Eigengewicht",
  "High permissible axle load": "Hohe zulässige Achslast",
  "Container equipment can be installed":
    "Container-Ausrüstung kann installiert werden",
  "Specialised equipment can be used":
    "Spezialausrüstung kann eingesetzt werden",
  "Suitable for regular industrial transport":
    "Für regelmäßige Industrietransporte geeignet",
  "Adaptable to a specific transport task":
    "An eine konkrete Transportaufgabe anpassbar",
  "Economic application": "Wirtschaftlicher Einsatz",
  "When PRO creates a practical economic benefit":
    "Wann PRO einen praktischen wirtschaftlichen Vorteil schafft",
  "The primary economically justified use case is regular transport of heavy cargo in both directions. When the platform is loaded outbound and inbound, its lower tare can be used throughout the transport cycle.":
    "Der wirtschaftlich begründete Haupteinsatz ist der regelmäßige Transport schwerer Ladung in beiden Richtungen. Ist die Plattform auf Hin- und Rückweg beladen, kann ihr geringeres Eigengewicht im gesamten Transportzyklus genutzt werden.",
  "Suitable heavy cargo is available in both directions":
    "Geeignete schwere Ladung ist in beiden Richtungen vorhanden",
  "The route permits an axle load of up to 22.5 tonnes":
    "Die Strecke erlaubt bis zu 22,5 Tonnen Achslast",
  "The container or specialised superstructure is rated for the corresponding mass":
    "Container oder Spezialaufbau sind für die entsprechende Masse ausgelegt",
  "Transport is regular or operates as a block-train service":
    "Die Transporte sind regelmäßig oder als Ganzzugverkehr organisiert",
  "Additional payload can reduce the required number of wagons or journeys":
    "Zusätzliche Nutzlast kann die benötigte Zahl von Wagen oder Fahrten reduzieren",
  "PRO is not a universal solution for every transport operation. The economic result must be assessed for the specific cargo, route, and operating model.":
    "PRO ist keine universelle Lösung für jeden Transport. Das wirtschaftliche Ergebnis muss für Ladung, Strecke und Betriebsmodell konkret bewertet werden.",
  "Removable ballast": "Herausnehmbarer Ballast",
  "Required mass for empty running": "Erforderliche Masse für Leerfahrten",
  "The base platform has a tare of approximately 16 tonnes, while the minimum permissible operating mass of an empty wagon should be around 16.5 tonnes, allowing for wheelset wear and subsequent wheel reprofiling. Special removable ballast provides the required mass.":
    "Die Basisplattform hat etwa 16 Tonnen Eigengewicht; die zulässige Mindestbetriebsmasse des leeren Wagens sollte unter Berücksichtigung von Radsatzverschleiß und späterer Reprofilierung etwa 16,5 Tonnen betragen. Spezieller herausnehmbarer Ballast stellt die erforderliche Masse sicher.",
  "The ballast can be removed when carrying heavy cargo, allowing the platform’s low tare to increase useful payload.":
    "Beim Transport schwerer Ladung kann der Ballast entfernt werden, sodass das geringe Eigengewicht der Plattform die Nutzlast erhöht.",
  "The principal PRO benefit is achieved when the platform is loaded in both directions. Removable ballast should not be treated as a stand-alone economic benefit for services with a consistently empty return.":
    "Der wesentliche PRO-Vorteil entsteht bei Beladung in beiden Richtungen. Herausnehmbarer Ballast ist bei ständig leerer Rückfahrt nicht als eigenständiger wirtschaftlicher Vorteil zu betrachten.",
  "Container transport": "Containertransport",
  "Loading schemes for 20, 30 and 40 ft ISO containers":
    "Ladeschemata für 20-, 30- und 40-Fuß-ISO-Container",
  "PRO INTERMODAL 60 ft has 24 foldable container pins and supports different arrangements of 20, 30 and 40 ft ISO containers.":
    "PRO INTERMODAL 60 ft besitzt 24 klappbare Containerzapfen und unterstützt verschiedene Anordnungen von 20-, 30- und 40-Fuß-ISO-Containern.",
  "Transport planning must consider both wagon payload and the maximum permitted gross mass of each container. A standard container does not always allow the full additional four tonnes of platform payload to be used; heavy cargo may require a container or specialised transport superstructure rated for the higher mass.":
    "Bei der Transportplanung sind sowohl die Wagennutzlast als auch die zulässige Bruttomasse jedes Containers zu berücksichtigen. Ein Standardcontainer ermöglicht nicht immer die Nutzung der vollen vier Tonnen zusätzlicher Plattformnutzlast; schwere Ladung kann einen für die höhere Masse ausgelegten Container oder Spezialaufbau erfordern.",
  "Container, cargo, and loading-scheme compatibility is checked for every project.":
    "Die Kompatibilität von Container, Ladung und Ladeschema wird für jedes Projekt geprüft.",
  "Specialised equipment": "Spezialausrüstung",
  "Three-quarter development rendering of the 70-foot TimberTop wagon for RCA":
    "Dreiviertelansicht des Entwicklungsmodells des 70-Fuß-TimberTop-Wagens für RCA",
  "A lightweight carrier for project-specific systems":
    "Ein leichter Träger für projektspezifische Systeme",
  "The platform can serve not only intermodal transport but also as a carrier for specialised technological equipment. The low frame mass leaves more allowance for equipment, working systems, and payload within the wagon’s permitted gross mass.":
    "Die Plattform kann nicht nur im Intermodalverkehr, sondern auch als Träger spezieller technischer Ausrüstung dienen. Die geringe Rahmenmasse lässt innerhalb der zulässigen Gesamtmasse mehr Spielraum für Ausrüstung, Arbeitssysteme und Nutzlast.",
  "The structure and attachment points for specialised equipment are developed to the requirements of the specific project.":
    "Konstruktion und Befestigungspunkte für Spezialausrüstung werden nach den Anforderungen des jeweiligen Projekts entwickelt.",
  "Confirmed operation": "Bestätigter Betrieb",
  "Three PRO 60 ft platforms are already in service":
    "Drei PRO-60-ft-Plattformen sind bereits im Einsatz",
  "Three PRO 60 ft platforms have been manufactured, sold, and placed in operation, including platforms carrying specialised equipment.":
    "Drei PRO-60-ft-Plattformen wurden gefertigt, verkauft und in Betrieb genommen, darunter Plattformen mit Spezialausrüstung.",
  "This is a practically implemented railway platform rather than an experimental concept. It can be used for intermodal and specialised transport solutions.":
    "Es handelt sich nicht um ein Versuchskonzept, sondern um eine praktisch realisierte Eisenbahnplattform für intermodale und spezielle Transportlösungen.",
  "Production is organised with qualified manufacturing partners. TransAnt performs the technical development, configuration coordination, and project support.":
    "Die Fertigung wird mit qualifizierten Produktionspartnern organisiert. TransAnt übernimmt technische Ausarbeitung, Konfigurationsabstimmung und Projektbegleitung.",
  "Wagon designation": "Wagenbezeichnung",
  "Number of axles": "Anzahl der Achsen",
  "Bogie type": "Drehgestelltyp",
  "Distance between bogie pivots": "Drehzapfenabstand",
  "Length over buffers": "Länge über Puffer",
  "Loading length": "Ladelänge",
  "Loading width": "Ladebreite",
  "Loading-surface height": "Höhe der Ladefläche",
  "Base-platform tare": "Eigengewicht der Basisplattform",
  "Intermodal configuration mass": "Masse der Intermodalausführung",
  "Operating mass with removable ballast":
    "Betriebsmasse mit herausnehmbarem Ballast",
  "Maximum axle load": "Maximale Achslast",
  "Maximum payload": "Maximale Nutzlast",
  "Container equipment": "Containerausrüstung",
  "Supported containers": "Unterstützte Container",
  "Vehicle gauge": "Fahrzeugbegrenzungslinie",
  "International-use marking": "Kennzeichnung für den internationalen Einsatz",
  "Additional markings": "Weitere Kennzeichnungen",
  "Container contact-plane height 1,155 mm; C in triangle; K in circle — Jurid 822":
    "Containerauflagehöhe 1.155 mm; C im Dreieck; K im Kreis — Jurid 822",
  "Minimum curve radius": "Mindestbogenradius",
  "Maximum operating speed": "Maximale Betriebsgeschwindigkeit",
  "Maximum brake-related speed": "Maximale bremsbedingte Geschwindigkeit",
  "Y25 with compact brake system": "Y25 mit Kompaktbremse",
  "19,740 mm with A-buffers / 19,830 mm with L-buffers":
    "19.740 mm mit A-Puffern / 19.830 mm mit L-Puffern",
  "approx. 16.0": "ca. 16,0",
  "approx. 16.3": "ca. 16,3",
  "approx. 16.5": "ca. 16,5",
  "up to 73.5": "bis zu 73,5",
  "20, 30 and 40 ft": "20, 30 und 40 Fuß",
  "Permitted payload by line class": "Zulässige Nutzlast nach Streckenklasse",
  "PRO INTERMODAL 60 ft payload by railway line class":
    "Nutzlast von PRO INTERMODAL 60 ft nach Streckenklasse",
  "Line class": "Streckenklasse",
  Payload: "Nutzlast",
  "Scroll table horizontally": "Tabelle horizontal scrollen",
  "PRO INTERMODAL 60 ft payload table":
    "Nutzlasttabelle für PRO INTERMODAL 60 ft",
  "Load limit notes": "Hinweise zu den Lastgrenzen",
  "The values apply to the stated platform configuration. Final parameters are confirmed for the installed equipment, container arrangement, and operating conditions.":
    "Die Werte gelten für die angegebene Plattformkonfiguration. Die endgültigen Parameter werden unter Berücksichtigung von Ausrüstung, Containeranordnung und Betriebsbedingungen bestätigt.",
  "Discuss your transport operation": "Ihren Transport besprechen",
  "To assess the practical benefit of PRO 60 ft, TransAnt considers the cargo, loading in both directions, containers or equipment, permitted route loads, annual transport volume, and loading and unloading requirements.":
    "Zur Bewertung des praktischen Nutzens von PRO 60 ft berücksichtigt TransAnt Ladung, Beladung in beiden Richtungen, Container oder Ausrüstung, zulässige Streckenlasten, jährliches Transportvolumen sowie Be- und Entladeanforderungen.",
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
    "Ingenieurlösungen für den europäischen Schienengüterverkehr",
    "Die TransAnt GmbH entwickelt, vermarktet und betreut Güterwagenlösungen für das europäische Normalspurnetz und koordiniert deren industrielle Umsetzung.",
    "/",
    "de",
    "prominent",
  ),
};
