'use strict';
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: "Safari Spartan Backpack",
        description: "Lightweight yet durable backpack/daypack for school use or everyday outings Front storage pocket keeps smaller items neatly organized and easy to access Mesh pockets on both sides to accommodate your water bottle and umbrella Mesh Padding on back & shoulder strap to provide comfort & better back support; 1-year International Warranty against manufacturing defects",
        category: "Bags",
        image: "safari.jpg",
        features: JSON.stringify([
          "Colour: Teal",
          "Size: S",
          "Lightweight yet durable backpack/daypack for school use or everyday outings",
          "Age Range Description: Adult",
          "Closure Type: Zipper",
          "Lining Description: Polyester"
        ]),
        price: 580,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Skybags Backpack",
        description: "Combination of functional & safety features in stylish design, Soft mesh back with 8 mm foam padded 2 Main Compartment, 1 Slip In Pocket inside the bag, Printed Design, Mesh bottle holder on the side,",
        category: "Bags",
        image: "skybag.jpg",
        features: JSON.stringify([
          "Colour: Black",
          "Size: S",
          "Lightweight yet durable backpack/daypack for school use or everyday outings",
          "Age Range Description: Adult",
          "Closure Type: Zipper",
          "Lining Description: Polyester",
          "Water Resistance Level: Not Water Resistant",
          "Size: 35 x 13 x 46 cms"
        ]),
        price: 550,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Genie Unicorn School Bag",
        description: "Made with superior quality material: Nylon Twill, which ensures everlasting shine and soft feel to the bag. Colour: Pink. Unicorn Design Capacity: 27 liters, Weight: 440 g, Dimensions: 43 x 30 x 21 cm Warranty: 12 months3 Spacious Compartments: Keep your Books, Stationary, Accessories, Lunch boxes, etc. It will store plenty of items. Organizer: Keep every single item separately in an arranged manner, with the help of our organizer. One side pocket: For holding water bottle, clipping pens or pencil or storing other items.",
        category: "Bags",
        image: "unicorn.jpg",
        features: JSON.stringify([
          "Colour: Pink",
          "Size: S",
          "Care Instructions: Hand Wash Only",
          "Age Range Description: Adult",
          "Closure Type: Zipper",
          "Lining Description: Polyester",
          "Easy grab padded handle: For added comfort and convenience to hold the bag",
          "Padded and Ergonomic Shoulder Straps"
        ]),
        price: 810,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Gurukul Last Years Papers",
        description: "Oswal - Gurukul Last Years 10 Solved Papers for CBSE Class 10 comprises of numerous tips and tools to improve study techniques for board exam preparation. Students can create vision boards to establish study schedules, and maintain study logs to measure their progress. Our CBSE Solved Paper can also help in providing a comprehensive overview of important topics in each subject, making it easier for students to prepare for the exams.",
        category: "Books",
        image: "cbse.jpg",
        features: JSON.stringify([
          "Includes Solved Board Papers from Previous Years 2014-2023",
          "All Sets of Delhi & Outside Delhi Covered",
          "Given 19 Solved Question Papers for each of these 4 subjects namely English (Language & Literature), Maths (Standard), Science, and Social",
          "Facilitates Easy and Last Minute Revision",
          "Solutions Provided in accordance with the Board Marking Scheme",
          "Out of Syllabus Questions can be identified with **"
        ]),
        price: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Handbook of Mathematics",
        description: "Mathematics of higher level has too many theories, rules and remembering all of them on tips all the time is not an easy task. Handbook of Mathematics is an important, useful and compact reference book suitable for everyday study, problem solving or exam revision for class XI XII. This book is a multi-purpose quick revision resource that contains almost all key notes, terms, definitions and formulae that all students professionals in mathematics will want to have this essential reference book within easy reach. Its unique format displays formulae clearly, places them in the context and crisply identifies describes all the variables involved, summary about every equations and formula that one might want while learning mathematics is one of the unique features of the book, a stimulating and crisp extract of fundamental mathematics is to be enjoyed by the beginners and experts equally. The book is from its first edition and one of the most useful books of its type. Table of content Sets, Relations and Binary Operations, Complex Numbers, Quadratic Equations.",
        category: "Books",
        image: "math.jpg",
        features: JSON.stringify([
          "Table of content Sets, Relations and Binary Operations, Complex Numbers, Quadratic Equations and Inequalities, Sequences and Series, Permutation and Combinations, Binomial Theorem and Mathematical Induction, Matrices, Determinant, Probability.",
          "All Sets of Delhi & Outside Delhi Covered",
          "Facilitates Easy Revision",
          "Elementary Arithmetic-II, Percentage and Its Applications, Elementary Algebra, Logarithm, Geometry, Mensuration."
        ]),
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Introductory Macroeconomics",
        description: "added sample projects patterned along the latest CBSE format for the reference of the students.Sample Paper by VK Global Study Group based on the specimen paper woven along the same structure and blueprint as suggested in the CBSE released Sample Question Paper-2023 has been included.Harmony and Synchronization: To maintain clarity of thought; the information in our book has been compiled and presented in a step by step manner so that students are able to comprehend things better. Comprehensive and elucidative tabular and diagrammatic presentation via flow charts etc. have been done wherever necessary.",
        category: "Books",
        image: "macro.jpg",
        features: JSON.stringify([
          "Brain Teaser blocks to test logical clarity and implication based learning.",
          "Basic Numericals following hand-holding approach for budding economists.",
          "Facilitates Easy Revision",
          "Competency Based Learning: Objective Questions"
        ]),
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Nataraj Sharpeners & Eraser",
        description: "Sharpener Scientifically angled blade for easy sharpening Anti-rust coating for long lasting blade edge Vibrant colours for joyful erasing Doesn’t leave a trace of colour while erasing Available in 5 attractive & fluorescent colours.",
        category: "Stationary",
        image: "eraser.jpg",
        features: JSON.stringify([
          "Product 1: Sharpener",
          "Product 1: Scientifically angled blade for easy sharpening",
          "Product 1: Anti-rust coating for long lasting blade edge",
          "Product 2: Vibrant colours for joyful erasing",
          "Product 2: Doesn’t leave a trace of colour while erasing",
          "Product 2: Available in 5 attractive & fluorescent colours"
        ]),
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Magnetic Geometry Pencil Box",
        description: " This 2-sided pencil box comes with a calculator at the top for your kids to aid in quick calculation. This stylish pencil case also has 2 built-in sharpeners for different types of pencils and color pencils. Uses magnetic straps on both sides for opening and closing.his 2-sided storage pencil case is big enough to hold all your school stationaries like set of pens, pencils, eraser, stapler, scissors, clips, pencil crayons, sharpener,",
        category: "Stationary",
        image: "box.jpg",
        features: JSON.stringify([
          "Brand: YBN",
          "Colour: SpiderMan",
          "Material: Plastic",
          "Style: Modern",
          "Closure: Type Magnetic"
        ]),
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "DOMS Smart Drawing Kit",
        description: " A comprehensive combination kit with all the drawing and coloring essentials to unleash the budding artist in your child. All packed together in a smart reusable kit box, it’s a great gifting option for any occasion like birthday, holidays, or just to encourage creativity. Kids drawing set: This drawing kit contains everything a young artist needs to get started with sketching, coloring, and drawing. An art supplies set designed to offer kids a complete drawing kit with a carrying case.",
        category: "Stationary",
        image: "domskit.jpg",
        features: JSON.stringify([
          "A Comprehensive Combination Kit With All The Drawing And Coloring Essentials",
          "Drawing Kit Contains Everything A Young Artist Needs To Get Started With Sketching, Coloring, And Drawing.",
          "An Art Supplies Set Designed To Offer Kids A Complete Drawing Kit With A Carrying Case.",
          "Dimensions - 36.2 x 29 x 3.2 cm; 400 Grams"
        ]),
        price: 190,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Classmate",
        description: "Classmate Octane 10x Notebook (Pack of 12, Single Line), Pack of 12 Single Line. 400 Pages 240 mm x 180 mm",
        category: "Books",
        image: "classmate.jpg",
        features: JSON.stringify([
          "8x12 Size Note Book",
          "Innovative cover design and International quality paper",
          "Coloured cutaway",
          "Soft Bound copy",
          "pack of 12"
        ]),
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Infinity Re-writeable Notebook",
        description: " The Infinity notebook is built for the digital age that provides a great writing experience. Infinity Notebook is endlessly reusable and is equivalent to atleast 50 traditional notebooks. So no more wasting paper on scripting, rough work, to do lists, calculations etc. Moreover if you're an art lover you can do doodling, calligraphy and more on this notebook. And if you have made notes that are really important to you, Infinity notebook pages are easily scannable with Apps like, Google Lens, Camscanner, Adobe Scan or any other scanning app for that matter. ",
          category: "Notebooks",
    
          image: "infinity.jpg",
        features: JSON.stringify([
          "Publisher : Rays Of Ink (1 January 2021)",
            "Language  :  English",
           " Spiral-bound  :  40 pages",
           " Reading age  :  9 years and up",
            "Item Weight :  340 g",
            "Country of Origin  :  India"
        ]),
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Classmate Long Notebook",
          description : " The cover design of the notebook is subject to change, it depends on stock availabilityClassmate Single Lines Ruled Long NotebookNotebooks for every subject for hassle-free note-taking during classes or lectures.Classmate uses elemental chlorine free paperThis notebook consists of quality papers",
          category: "Notebooks",
    
          image: "classmate.jpg",
        features: JSON.stringify([
       "Brand : Generic",
    "Style : Vintage",
    "Ruling Type : Ruled",
    "Special Feature : Lined, Soft Cover"
        ]),
        price: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
       
        name: "YOUVA Note Book",
        description : " Full Sewn pages strong & sturdy binding. Violet Laminated cover design so that student need not bother themselves by covering note books.The cover design of the Long Book is subject to change, it depends on stock availability ",
        category: "Notebooks",
  
        image: "youva.jpg",
        features: JSON.stringify([
          "Brand : Youva",
          "Style : Vintage",
          "Ruling Type : Ruled",
          "Special Feature : Lined, Soft Cover , wired"
        ]),
        price: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Doms Neon Rubber Graphite Pencils",
        description:  `
        DOMS Superio Tipped Graphite pencils are made with accurate bonding process and high quality graphite for neat,dark and long lasting writing. It's well treated softened wood ensures smooth sharpening and longer shelf-life meeting Internation Quality Standards`,
        category: "Pencil",  
        features: JSON.stringify([
          " Brand : Doms",
                       " Writing instrument form : Graphite Pencil",
                        "Colour : Multicolor",
                        "Ink Colour: Black",
                       " Rubber tipped pencils.",
    "Softened & Well Treated Wood For Smooth Sharpening & Longer Shelf Life."
        ]),
        price: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        "name": "Natraj 621 BE Bold Penci",
        "description":  `
        Hindustan Pencils Pvt. Ltd. is an Indian manufacturer of pencils, writing materials and other stationery items, established in 1958 in Bombay (present-day Mumbai). The company makes writing implements under the brands Nataraj and Apsara, and claims to be the largest pencil manufacturer in India.Hindustan Pencils' products include: 621, Bold, Marble (pencils) and Dust Clear (eraser) under the Nataraj brand; Platinum, Absolute (pencils) and Long Point (pencil sharpener) under the Apsara brand. The range of products is as follows:`,
        "category": "Pencil",  
        "image": "natraj.jpeg",

        features: JSON.stringify([
          " Brand : Natraj",
          "Writing instrument form : Charcoal Pencil",
          "Colour : Black",
          "Ink Colour	: Black",
          "Easy to grip"
        ]),
        price: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Cassarina  Keychain Key Ring",
        description:  `
        Made from quality polished metal material, which is compact design with light weight and fine craftsmanship.Creative Design, Exquisite and elegant, excellent workmanship, Very Fashionable Keychain, Make You Look DifferentThis car shifter shaped keychain can help to learn how to drive a stick shift and this is a nice little gadget to remind you succeed. This keychain adopts lifelike car shifter shaped design, with 6 speed and reverse gear shifter, you can actually shift the gear and it actually can moves.High quality stick shifting gearbox keychain! No clutch required :) Perfect gift for the car fanatic in your life`,
        category: "Keychain",  
                  image: "gearKeychain.jpeg",
        features: JSON.stringify([
          " Material : Made from quality polished metal material, which is compact design with light weight and fine craftsmanship.",
                   "The Gear Actually Can Move : This keychain adopts lifelike car shifter shaped design, with 6 speed and reverse gear shifter, you can actually shift the gear and it actually can moves.",
                  " Multipurpose Use : This car shifter shaped keychain can help to learn how to drive a stick shift and this is a nice little gadget to remind you succeed.",
                  " Creative Gift : This car shifter shaped keychain can be a memorable and collectible key chain, fashion, creative gift for friends and car fans."
        ]),
        price: 250,
        createdAt: new Date(),
        updatedAt: new Date()
  
   },
   {
    id: uuidv4(),

    name: " ARTLABEL Cute Cartoon Keyring",
    description:  `
    MRubber Keychain available in different cartoon characters that are loved by kids and Adults .Quality utility key holder with attractive design. Strong and durable product with superior finish Light Weight And Easily Fits Into The Pocket. A Gorgeous Appearance is like piece of art that can be a desktop pendant and a cool ornament hanging on a backpack.Best Birthday Return Gifts option available in the market .Best for Gifting Purpose on Navratri, Birthday Gifts, Party Gifts etc . Key chains. Random Designs will be sent as per availability.`,
    category: "Keychain",  
              image: "artchain.webp",
              features: JSON.stringify ([
               " Colour	: Multi-color",
              " Material : Rubber",
              " Brand: ARTLABEL",
               "Net Quantity : 12.00 count",
               "Theme : Cartoon Character"

              ]),
              price: "320",
              createdAt: new Date(),
        updatedAt: new Date()
  },
  {
    id: uuidv4(),

    name: " wolpin 1 Pc Keyring & Keychaing",
    description:  `
    Cute Design - These double pendant key chains are strong enough to carry just about anything & to fit in your pocket. Has a thin film on both sides to protect from scratching. Cute Keychain Keyring PVCMulti-Purpose - Can be used as a key chain for Car, bike, tags for your luggage, purse or car keys. Also great for clipping on your backpack, airpods case or purse.Fashionable And Functional - This key strap can be used as a stylish fashion accessory or as a functional key holder.This key chain sets are the perfect gift for your friends family, significant other, or for yourself!Hook and loop and snap hooks make it convenient to clip keys together, no more worries about keys being lost.`,
    category: "Keychain",  
              image: "wolpin.jpeg",
              features: JSON.stringify([
               " Colour	: Multi-color",
              " Material : Polyvinyl Chloride (PVC)",
              "Theme :  Space",
              "Closure Type	: Hook,Loop,Snap,Strap"

              ]),
              price: "270",
              createdAt: new Date(),
              updatedAt: new Date()
  },
  {
    id: uuidv4(),

    name: " Navneet Youva Paper for Project",
    description:  `
    Project Paper offers a choice of 16 design patterns with Index Project Paper is a collection of self-designed journal papers with beautiful design patterns to be used by students for their projects and assignments in a more organized mannerFurther, it provides a beautiful layout to add a classy and premium look to the project The inserter design and index used in the Project Papers`,
    category: "AssignmentFile",  
              image: "youvapaper.webp",
              features: JSON.stringify([
            " Colour : Multicolor",
"Sheet Size	: 22 cm x 28 cm",
"Brand : Navneet Youva",
"Sheet Count: 100",
"Pattern Name: Ruled"
              ]),
              price: "105",
              createdAt: new Date(),
              updatedAt: new Date()
  },
  {
    id: uuidv4(),

    name: " Lakeer Ruled Assignment Sheets",
    description:  `
    Pack Of 50 Single Side Ruled Coloured Sheets Easily To Keep Notes Organized & Up To Date.COLLEGE RULED FOR OLDER STUDENTS: pick the preferred ruling for those in middle and high school or for college and professional use; the 9?32" spacing fits more writing per page than wide-ruled paper PAPER FOR EVERYDAY: Paraspapermart provides quality binder paper perfect for normal everyday notetaking with your favorite ink or gel pens or pencil; A STOCK-UP STAPLE: large packs of filler paper make it easy to shop ahead; show your forethought and shop for the entire school year or replenish your dwindling stock for second semester Include 5 different color to eliminate the confusion between which notebook is for which class`,
    category: "AssignmentFile",  
              image: "larkpaper.jpeg",
              features:JSON.stringify([
                "Model Name : Single Side Ruled A4 Ruled colored Project Sheets Loose Leaf Filler Paper",
              " Type : Project Paper",
               " Number of Sheets : 100 Sheets",
                 "Paper Size : A4 Size" ,
                " Paper Density : 70 gsm ",
                " Rule Type :  Ruled"
                
              ]),
              price: "250",
              createdAt: new Date(),
              updatedAt: new Date()
  },
  {
    id: uuidv4(),


    name: " Kraastic A4 Assignment Sheets",
    description:  `
    Assignment design sheet set of 40 sheets one side line and one side plain 100 GSM Coloured Sheets Easily To Keep Notes Organized & Up To Date.COLLEGE RULED FOR OLDER STUDENTS: pick the preferred ruling for those in middle and high school or for college and professional use; the 9?32" spacing fits more writing per page than wide-ruled paper PAPER FOR EVERYDAY: Paraspapermart provides quality binder paper perfect for normal everyday notetaking with your favorite ink or gel pens or pencil; A STOCK-UP STAPLE: large packs of filler paper make it easy to shop ahead; show your forethought and shop for the entire school year or replenish your dwindling stock for second semester Include 5 different color to eliminate the confusion between which notebook is for which class`,
    category: "AssignmentFile",  
              image: "superfile.webp",
              features: JSON.stringify([
                
                "Model Name : Assignment design sheet set of 40 sheets one side line and one side plain 100 GSM" ,
             
              "  Type : Project Paper ",
               " Number of Sheets : 40 Sheets ",
               " Paper Size :  A4 Size",
              " Paper Density : 100 gsm, 120 gsm",
"Rule Type : ONE SIDE"
              
                
              ]),
              price: "250",
              createdAt: new Date(),
              updatedAt: new Date()
  },
  {
    id: uuidv4(),
    
    name:"Apsara Platinum Extra Dark Pencil",
    description:"Apsara Pencil is one of the most basic stationery items needed in every stationary kit for a student and in homes and offices. It is used for writing notes, drawing and marking layouts. Pencil written texts can easily be erased using an eraser, making it extremely useful while sketching and drawing.",
    features: JSON.stringify(["  Brand : Apsara "," Item Dimensions LxWxH : 20 x 10 x 5 Centimeters","  Line Size : 0.3mm","  Item Weight : 800 Grams","  Efficient usage"]),category:"Pencil",image:"apsra.jpg",price:"100",
    createdAt: new Date(),
    updatedAt: new Date()}
  
  
  ], {});
   console.log("added");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
