export interface GameProgress {
  id?: string;
  session_id: string;
  current_level: number;
  total_score: number;
  highest_level: number;
  created_at?: string;
  updated_at?: string;
}

export interface GameItem {
  id: number;
  icon: string;
  isTarget: boolean;
  isFound: boolean;
}

export interface LevelConfig {
  level: number;
  gridSize: number;
  targetCount: number;
  timeLimit: number;
  pointsPerItem: number;
  theme: string;
}
