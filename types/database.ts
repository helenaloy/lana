export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      editable_sections: {
        Row: {
          id: string;
          section: string;
          content: {
            text: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section: string;
          content: {
            text: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section?: string;
          content?: {
            text: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

