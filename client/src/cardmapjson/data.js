const data = [
    {
        id: 1,
        title: "One Piece",
        image: "one_piece.jpg",
        episodes: 1000,
        genre: ["Adventure", "Action", "Fantasy"],
        description: "Monkey D. Luffy sets off on an adventure to become the Pirate King.",
        watchLink: "https://www.crunchyroll.com/one-piece",
        character:[ 
            { id: 11, name: "Monkey D. Luffy", image: "luffy.jpg", character: "Main Character" },
            { id: 12, name: "Roronoa Zoro", image: "zoro.jpg" },
            { id: 13, name: "Shanks", image: "SHANKS.jpg" }
        ]
    },
    {
        id: 2,
        title: "Naruto",
        image: "Naruto.jpg",
        episodes: 720,
        genre: ["Action", "Adventure", "Shonen"],
        description: "Naruto Uzumaki dreams of becoming the Hokage of the Hidden Leaf Village.",
        watchLink: "https://www.crunchyroll.com/series/GYQ4MW246/naruto-shippuden",
        character: [ 
            { id: 21, name: "Naruto Uzumaki", image: "uzumaki.jpg", character: "Main Character" },
            { id: 22, name: "Sasuke Uchiha", image: "sasuka.jpg" },
            { id: 23, name: "Itachi Uchiha", image: "itachi.jpg" }
        ]
    },
    {
        id: 3,
        title: "Attack on Titan",
        image: "attack-on-titan.jpg",
        episodes: 88,
        genre: ["Action", "Drama", "Fantasy"],
        description: "Eren Yeager fights against the Titans threatening humanity's survival.",
        watchLink: "https://www.justwatch.com/us/tv-show/attack-on-titan/season-1",
        character: [
            { id: 31, name: "Eren Yeager", image: "Eren.jpg" ,character:"Main Character"},
            { id: 32, name: "Mikasa Ackerman", image: "Mikasa.jpg" },
            { id: 33, name: "Levi Ackerman", image: "Levi.jpg" }
        ]
    },
    {
        id: 4,
        title: "Blue Box",
        image: "blue_box.jpg",
        episodes: 24,
        genre: ["Romance", "Sports", "Drama"],
        description: "A story of love and badminton between Taiki Inomata and Chinatsu Kano.",
        watchLink: "https://www.justwatch.com/us/tv-show/blue-box/season-1",
        character: [ 
            { id: 41, name: "Taiki Inomata", image: "Taik.jpg" ,character:"Main Character"},
            { id: 42, name: "Chinatsu Kano", image: "Chinatsu.jpg" }
        ]
    },
    {
        id: 5,
        title: "Death Note",
        image: "Death_Note.jpg",
        episodes: 37,
        genre: ["Mystery", "Thriller", "Supernatural"],
        description: "Light Yagami discovers a notebook that allows him to kill anyone.",
        watchLink: "https://www.justwatch.com/us/tv-show/death-note",
        character:[ 
            { id: 61, name: "Light Yagami", image: "Light.jpg" ,character:"Main Character"},
            { id: 62, name: "L Lawliet", image: "L.jpg" }
        ]
    },
    {
        id: 6,
        title: "Demon Slayer",
        image: "deamon_slayer.jpg",
        episodes: 47,
        genre: ["Action", "Supernatural", "Shonen"],
        description: "Tanjiro Kamado fights demons after his family is slaughtered.",
        watchLink: "https://www.crunchyroll.com/demon-slayer-kimetsu-no-yaiba",
        character:[ 
            { id: 51, name: "Tanjiro Kamado", image: "Tanjiro.jpg",character:"Main Character" },
            { id: 52, name: "Nezuko Kamado", image: "Nezuko.jpg" }
        ]
    },
    {
        id: 7,
        title: "Jujutsu Kaisen",
        image: "jjk.jpg",
        episodes: 47,
        genre: ["Action", "Supernatural", "Shonen"],
        description: "Yuji Itadori fights curses after consuming a powerful curse object.",
        watchLink: "https://www.crunchyroll.com/jujutsu-kaisen",
        character:[ 
            { id: 71, name: "Yuji Itadori", image: "Yuji.jpg",character:"Main Character" },
            { id: 72, name: "Satoru Gojo", image: "Satoru.jpg" },
            { id: 73, name: "Ryomen Sukuna", image: "Sukuna.jpg" }
        ]
    },
    {
        id: 8,
        title: "Sakamoto Days",
        image: "sakamoto_days.jpg",
        episodes: 12,  
        genre: ["Action", "Comedy", "Shonen"],
        description: "A retired hitman runs a convenience store but can't escape his past.",
        watchLink: "https://www.justwatch.com/us/tv-show/sakamoto-days",
        character:[ 
            { id: 801, name: "Taro Sakamoto", image: "Taro.jpg",character:"Main Character" },
            { id: 802, name: "Shin Asakura", image: "shin.jpg" }
        ]
    },
    {
        id: 9,
        title: "Dr. Stone",
        image: "drstone.jpg",
        episodes: 63,
        genre: ["Adventure", "Science Fiction", "Shonen"],
        description: "Senku Ishigami uses science to rebuild civilization after a mysterious event.",
        watchLink: "https://www.crunchyroll.com/dr-stone",
        character:[ 
            { id: 91, name: "Senku Ishigami", image: "Senku.jpg" ,character:"Main Character"},
            { id: 92, name: "Chrome", image: "Chrome.jpg" }
        ]
    },
    {
        id: 10,
        title: "Solo Leveling",
        image: "solo-leveling.jpg",
        episodes: 12,  
        genre: ["Action", "Fantasy", "Adventure"],
        description: "Jinwoo Sung levels up from the weakest hunter to the strongest.",
        watchLink: "https://www.crunchyroll.com/solo-leveling",
        character:[ 
            { id: 101, name: "Sung Jin-Woo", image: "Sung.jpg" ,character:"Main Character"},
            { id: 102, name: "Cha Hae-In", image: "Cha.jpg" }
        ] 
    }
];

export default data;
