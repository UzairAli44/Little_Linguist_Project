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
        title: "Matching Game",
        description: 'Here is the Description for the Macthing game.',
        dificulty: GameDifficulty.Easy
    },
    Trivia:{
        title: "Trivia",
        description: 'Here is the Description for the Trivia game.',
        dificulty: GameDifficulty.Hard
    },
    Bilingual:{
        title: "Bilingual",
        description: 'Here is the Description for the Bilingual game.',
        dificulty: GameDifficulty.Medium
    }
}
