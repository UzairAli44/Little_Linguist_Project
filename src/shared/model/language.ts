export enum Language {
    Hebrew = "Hebrew",
    English = "English"
}
export enum GameDifficulty {
    Hard = "Hard",
    Medium = "Medium",
    Easy = "Easy"
}

export const GameLevel = {
    MatchingGame:{
        title: "Word Matching Game",
        description: 'Here is the Description for the Word Macthing game.',
        dificulty: GameDifficulty.Easy
    },
    Trivia:{
        title: "Word Sorting Game",
        description: 'Here is the Description for the Word Sorting Game.',
        dificulty: GameDifficulty.Hard
    },
    Bilingual:{
        title: "Bilingual",
        description: 'Here is the Description for the Bilingual game.',
        dificulty: GameDifficulty.Medium
    }
}
