export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cards: {
        Row: {
          _id: string
          ankiNoteId: string | null
          backlink: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"]
          createdAt: string | null
          deckId: string
          editorStateBack: string
          editorStateFront: string
          isSuspended: boolean
          tags: string[]
        }
        Insert: {
          _id?: string
          ankiNoteId?: string | null
          backlink?: string | null
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          createdAt?: string | null
          deckId: string
          editorStateBack: string
          editorStateFront: string
          isSuspended?: boolean
          tags?: string[]
        }
        Update: {
          _id?: string
          ankiNoteId?: string | null
          backlink?: string | null
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          createdAt?: string | null
          deckId?: string
          editorStateBack?: string
          editorStateFront?: string
          isSuspended?: boolean
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
        ]
      }
      cram_sessions: {
        Row: {
          _id: string
          backlink: string | null
          createdAt: string
          deckId: string
          endDate: string
          learnByDate: string
          numReviews: number
          startDate: string
        }
        Insert: {
          _id?: string
          backlink?: string | null
          createdAt?: string
          deckId: string
          endDate: string
          learnByDate: string
          numReviews?: number
          startDate: string
        }
        Update: {
          _id?: string
          backlink?: string | null
          createdAt?: string
          deckId?: string
          endDate?: string
          learnByDate?: string
          numReviews?: number
          startDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
        ]
      }
      decks: {
        Row: {
          _id: string
          ankiDeckId: number | null
          backlink: string | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"]
          description: string | null
          lastReviewed: string | null
          maxNewPerDay: number
          maxReviewPerDay: number
          title: string
          userId: string
        }
        Insert: {
          _id?: string
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"]
          description?: string | null
          lastReviewed?: string | null
          maxNewPerDay?: number
          maxReviewPerDay?: number
          title: string
          userId: string
        }
        Update: {
          _id?: string
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"]
          description?: string | null
          lastReviewed?: string | null
          maxNewPerDay?: number
          maxReviewPerDay?: number
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      genlogs: {
        Row: {
          _id: string
          count: number
          parameters: Json | null
          timestamp: string
          type: Database["public"]["Enums"]["GENTYPE"]
          userId: string
        }
        Insert: {
          _id?: string
          count: number
          parameters?: Json | null
          timestamp?: string
          type: Database["public"]["Enums"]["GENTYPE"]
          userId: string
        }
        Update: {
          _id?: string
          count?: number
          parameters?: Json | null
          timestamp?: string
          type?: Database["public"]["Enums"]["GENTYPE"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "genlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      review_states_cram: {
        Row: {
          dueDate: string
          interval: number
          numReviews: number
          repetition: number
          reviewId: string
        }
        Insert: {
          dueDate?: string
          interval?: number
          numReviews?: number
          repetition?: number
          reviewId: string
        }
        Update: {
          dueDate?: string
          interval?: number
          numReviews?: number
          repetition?: number
          reviewId?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_active"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_active_unique_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_due_eod_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_due_eod_with_duplicate_card_ids_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_base_reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_derived_reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_derived_reviews_due_eod_uncapped"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_cram_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_final_reviews"
            referencedColumns: ["_id"]
          },
        ]
      }
      review_states_sm2: {
        Row: {
          dueDate: string
          easiness: number
          frontier: Json | null
          interval: number
          lapses: number
          numReviews: number
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          repetition: number
          reviewId: string
        }
        Insert: {
          dueDate?: string
          easiness?: number
          frontier?: Json | null
          interval?: number
          lapses?: number
          numReviews?: number
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          repetition?: number
          reviewId: string
        }
        Update: {
          dueDate?: string
          easiness?: number
          frontier?: Json | null
          interval?: number
          lapses?: number
          numReviews?: number
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          repetition?: number
          reviewId?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_active"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_active_unique_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_due_eod_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_due_eod_with_duplicate_card_ids_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "reviews_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_base_reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_derived_reviews"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_derived_reviews_due_eod_uncapped"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "review_states_sm2_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: true
            referencedRelation: "vw_final_reviews"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews: {
        Row: {
          _id: string
          cardId: string
          cardType: Database["public"]["Enums"]["CARDTYPE"]
          dueDate: string
          easiness: number
          editorStateBack: string
          editorStateFront: string
          frontier: Json | null
          interval: number
          isNew: boolean
          lapses: number
          numReviews: number
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number
          repetition: number
          state_cram: Json
          state_sm2: Json
          time: number | null
        }
        Insert: {
          _id?: string
          cardId: string
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          dueDate?: string
          easiness?: number
          editorStateBack: string
          editorStateFront: string
          frontier?: Json | null
          interval?: number
          isNew?: boolean
          lapses?: number
          numReviews?: number
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          priority?: number
          repetition?: number
          state_cram?: Json
          state_sm2?: Json
          time?: number | null
        }
        Update: {
          _id?: string
          cardId?: string
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          dueDate?: string
          easiness?: number
          editorStateBack?: string
          editorStateFront?: string
          frontier?: Json | null
          interval?: number
          isNew?: boolean
          lapses?: number
          numReviews?: number
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          priority?: number
          repetition?: number
          state_cram?: Json
          state_sm2?: Json
          time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      revlogs: {
        Row: {
          _id: string
          cardId: string
          deckId: string
          evaluation: string
          isNew: boolean | null
          ivl: number | null
          lastIvl: number | null
          reviewId: string
          time: number | null
          timestamp: string | null
          userId: string
        }
        Insert: {
          _id?: string
          cardId: string
          deckId: string
          evaluation: string
          isNew?: boolean | null
          ivl?: number | null
          lastIvl?: number | null
          reviewId: string
          time?: number | null
          timestamp?: string | null
          userId: string
        }
        Update: {
          _id?: string
          cardId?: string
          deckId?: string
          evaluation?: string
          isNew?: boolean | null
          ivl?: number | null
          lastIvl?: number | null
          reviewId?: string
          time?: number | null
          timestamp?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      tasks: {
        Row: {
          _id: string
          completedAt: string | null
          createdAt: string | null
          currentStep: number
          currentStepName: string
          name: Database["public"]["Enums"]["TASKNAME"]
          parameters: Json | null
          percentage: number
          status: Database["public"]["Enums"]["TASKSTATUS"]
          totalSteps: number
          userId: string
        }
        Insert: {
          _id?: string
          completedAt?: string | null
          createdAt?: string | null
          currentStep?: number
          currentStepName?: string
          name: Database["public"]["Enums"]["TASKNAME"]
          parameters?: Json | null
          percentage?: number
          status?: Database["public"]["Enums"]["TASKSTATUS"]
          totalSteps?: number
          userId: string
        }
        Update: {
          _id?: string
          completedAt?: string | null
          createdAt?: string | null
          currentStep?: number
          currentStepName?: string
          name?: Database["public"]["Enums"]["TASKNAME"]
          parameters?: Json | null
          percentage?: number
          status?: Database["public"]["Enums"]["TASKSTATUS"]
          totalSteps?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      temp_cards: {
        Row: {
          _id: string | null
          ankiNoteId: string | null
          backlink: string | null
          cardType: string | null
          createdAt: string | null
          deckId: string | null
          editorStateBack: string | null
          editorStateFront: string | null
          isSuspended: boolean
          tags: string[] | null
        }
        Insert: {
          _id?: string | null
          ankiNoteId?: string | null
          backlink?: string | null
          cardType?: string | null
          createdAt?: string | null
          deckId?: string | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          isSuspended?: boolean
          tags?: string[] | null
        }
        Update: {
          _id?: string | null
          ankiNoteId?: string | null
          backlink?: string | null
          cardType?: string | null
          createdAt?: string | null
          deckId?: string | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          isSuspended?: boolean
          tags?: string[] | null
        }
        Relationships: []
      }
      temp_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          createdAt: string | null
          deckType: string | null
          description: string | null
          lastReviewed: string | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          title: string | null
          userId: string | null
        }
        Insert: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: string | null
          description?: string | null
          lastReviewed?: string | null
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: string | null
          description?: string | null
          lastReviewed?: string | null
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      temp_reviews: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateFront: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          time: number | null
        }
        Insert: {
          _id?: string | null
          cardId?: string | null
          cardType?: string | null
          dueDate?: string | null
          easiness?: number | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          frontier?: Json | null
          interval?: number | null
          isNew?: boolean | null
          lapses?: number | null
          numReviews?: number | null
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          priority?: number | null
          repetition?: number | null
          time?: number | null
        }
        Update: {
          _id?: string | null
          cardId?: string | null
          cardType?: string | null
          dueDate?: string | null
          easiness?: number | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          frontier?: Json | null
          interval?: number | null
          isNew?: boolean | null
          lapses?: number | null
          numReviews?: number | null
          prevEasiness?: number | null
          prevEvaluation?: string | null
          prevInterval?: number | null
          prevRepetition?: number | null
          priority?: number | null
          repetition?: number | null
          time?: number | null
        }
        Relationships: []
      }
      temp_revlogs: {
        Row: {
          _id: string | null
          cardId: string | null
          deckId: string | null
          evaluation: string | null
          isNew: boolean | null
          ivl: number | null
          lastIvl: number | null
          reviewId: string | null
          time: number | null
          timestamp: string | null
          userId: string | null
        }
        Insert: {
          _id?: string | null
          cardId?: string | null
          deckId?: string | null
          evaluation?: string | null
          isNew?: boolean | null
          ivl?: number | null
          lastIvl?: number | null
          reviewId?: string | null
          time?: number | null
          timestamp?: string | null
          userId?: string | null
        }
        Update: {
          _id?: string | null
          cardId?: string | null
          deckId?: string | null
          evaluation?: string | null
          isNew?: boolean | null
          ivl?: number | null
          lastIvl?: number | null
          reviewId?: string | null
          time?: number | null
          timestamp?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      temp_users: {
        Row: {
          _id: string | null
          cardType: string | null
          firstName: string | null
          hasUsedFreeTrial: boolean | null
          isJoyrideDone: boolean | null
          lastName: string | null
          maxNewCards: number | null
          maxReviewCards: number | null
          showNewCardsFirst: boolean | null
          skipDays: number | null
          subscription: string | null
          subscriptionEnd: string | null
          timezone: string | null
          university: string | null
          userEmail: string | null
        }
        Insert: {
          _id?: string | null
          cardType?: string | null
          firstName?: string | null
          hasUsedFreeTrial?: boolean | null
          isJoyrideDone?: boolean | null
          lastName?: string | null
          maxNewCards?: number | null
          maxReviewCards?: number | null
          showNewCardsFirst?: boolean | null
          skipDays?: number | null
          subscription?: string | null
          subscriptionEnd?: string | null
          timezone?: string | null
          university?: string | null
          userEmail?: string | null
        }
        Update: {
          _id?: string | null
          cardType?: string | null
          firstName?: string | null
          hasUsedFreeTrial?: boolean | null
          isJoyrideDone?: boolean | null
          lastName?: string | null
          maxNewCards?: number | null
          maxReviewCards?: number | null
          showNewCardsFirst?: boolean | null
          skipDays?: number | null
          subscription?: string | null
          subscriptionEnd?: string | null
          timezone?: string | null
          university?: string | null
          userEmail?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          _id: string
          auth0_id: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"]
          firstName: string | null
          hasUsedFreeTrial: boolean
          isJoyrideDone: boolean
          lastName: string | null
          maxNewCards: number
          maxReviewCards: number
          showNewCardsFirst: boolean
          skipDays: number
          subscription: Database["public"]["Enums"]["SUBSCRIPTION"]
          subscriptionEnd: string | null
          timezone: string
          university: string | null
          userEmail: string
        }
        Insert: {
          _id: string
          auth0_id?: string | null
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          firstName?: string | null
          hasUsedFreeTrial?: boolean
          isJoyrideDone?: boolean
          lastName?: string | null
          maxNewCards?: number
          maxReviewCards?: number
          showNewCardsFirst?: boolean
          skipDays?: number
          subscription?: Database["public"]["Enums"]["SUBSCRIPTION"]
          subscriptionEnd?: string | null
          timezone?: string
          university?: string | null
          userEmail: string
        }
        Update: {
          _id?: string
          auth0_id?: string | null
          cardType?: Database["public"]["Enums"]["CARDTYPE"]
          firstName?: string | null
          hasUsedFreeTrial?: boolean
          isJoyrideDone?: boolean
          lastName?: string | null
          maxNewCards?: number
          maxReviewCards?: number
          showNewCardsFirst?: boolean
          skipDays?: number
          subscription?: Database["public"]["Enums"]["SUBSCRIPTION"]
          subscriptionEnd?: string | null
          timezone?: string
          university?: string | null
          userEmail?: string
        }
        Relationships: []
      }
    }
    Views: {
      cards_view: {
        Row: {
          _id: string | null
          ankiNoteId: string | null
          backlink: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          createdAt: string | null
          deckId: string | null
          editorStateBack: string | null
          editorStateFront: string | null
          isSuspended: boolean | null
          tags: string[] | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      deck_review_stats_view: {
        Row: {
          avgInterval: number | null
          deckId: string | null
          dueReviewsDoneToday: number | null
          dueReviewsDueTodayCapped: number | null
          dueReviewsDueTodayUncapped: number | null
          dueReviewsRemainingBudget: number | null
          dueReviewsTotal: number | null
          lastReviewed: string | null
          maxNewCards: number | null
          maxReviewCards: number | null
          newReviewsDoneToday: number | null
          newReviewsDueTodayCapped: number | null
          newReviewsDueTodayUncapped: number | null
          newReviewsRemainingBudget: number | null
          newReviewsTotal: number | null
          numCards: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      deck_tags_view: {
        Row: {
          deckId: string | null
          tags: string[] | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      decks_with_is_published_view: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          isPublished: boolean | null
          lastReviewed: string | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          numCards: number | null
          title: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews_active: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          deckId: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          isSuspended: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews_active_unique_view: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          deckId: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews_due_eod_view: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          deckId: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews_due_eod_with_duplicate_card_ids_view: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          deckId: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          isSuspended: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      reviews_view: {
        Row: {
          _id: string | null
          cardId: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          deckId: string | null
          dueDate: string | null
          easiness: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          frontier: Json | null
          interval: number | null
          isNew: boolean | null
          isSuspended: boolean | null
          lapses: number | null
          numReviews: number | null
          prevEasiness: number | null
          prevEvaluation: string | null
          prevInterval: number | null
          prevRepetition: number | null
          priority: number | null
          repetition: number | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      revlog_aggregate_view: {
        Row: {
          dueReviewsDoneToday: number | null
          dueReviewsRemainingBudget: number | null
          maxNewCards: number | null
          maxReviewCards: number | null
          newReviewsDoneToday: number | null
          newReviewsRemainingBudget: number | null
          userId: string | null
        }
        Relationships: []
      }
      subscriptions_view: {
        Row: {
          communityDeckId: string | null
          subscriptionDeckId: string | null
          userId: string | null
        }
        Insert: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Update: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_cards: {
        Row: {
          _id: string | null
          ankiNoteId: string | null
          backlink: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          createdAt: string | null
          deckId: string | null
          editorStateBack: string | null
          editorStateFront: string | null
          isSuspended: boolean | null
          tags: string[] | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          isCram: boolean | null
          isPublished: boolean | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          title: string | null
          userId: string | null
        }
        Insert: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"] | null
          description?: string | null
          isCram?: never
          isPublished?: never
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"] | null
          description?: string | null
          isCram?: never
          isPublished?: never
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_decks_filter: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          title: string | null
          userId: string | null
        }
        Insert: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"] | null
          description?: string | null
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Update: {
          _id?: string | null
          ankiDeckId?: number | null
          backlink?: string | null
          createdAt?: string | null
          deckType?: Database["public"]["Enums"]["DECKTYPE"] | null
          description?: string | null
          maxNewPerDay?: number | null
          maxReviewPerDay?: number | null
          title?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_reviews: {
        Row: {
          _id: string | null
          cardId: string | null
          editorStateBack: string | null
          editorStateFront: string | null
          isNew: boolean | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          time: number | null
        }
        Insert: {
          _id?: string | null
          cardId?: string | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          isNew?: boolean | null
          priority?: number | null
          state_cram?: Json | null
          state_sm2?: Json | null
          time?: number | null
        }
        Update: {
          _id?: string | null
          cardId?: string | null
          editorStateBack?: string | null
          editorStateFront?: string | null
          isNew?: boolean | null
          priority?: number | null
          state_cram?: Json | null
          state_sm2?: Json | null
          time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_revlog_summary: {
        Row: {
          count: number | null
          date: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_subscriptions: {
        Row: {
          communityDeckId: string | null
          subscriptionDeckId: string | null
          userId: string | null
        }
        Insert: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Update: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_base_users: {
        Row: {
          _id: string | null
          auth0_id: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          firstName: string | null
          hasUsedFreeTrial: boolean | null
          isJoyrideDone: boolean | null
          lastName: string | null
          maxNewCards: number | null
          maxReviewCards: number | null
          numCardsGenerated: number | null
          numExplanationsGenerated: number | null
          numTranslationsGenerated: number | null
          showNewCardsFirst: boolean | null
          skipDays: number | null
          subscription: Database["public"]["Enums"]["SUBSCRIPTION"] | null
          subscriptionEnd: string | null
          timezone: string | null
          university: string | null
          userEmail: string | null
        }
        Relationships: []
      }
      vw_derived_community_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          cards: Json[] | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          numCards: number | null
          numSubscribers: number | null
          title: string | null
          userDeckRelation: string | null
          userId: string | null
          viewerId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_derived_cram_sessions: {
        Row: {
          deckId: string | null
          endDate: string | null
          learnByDate: string | null
          startDate: string | null
          tgtNewPerDay: number | null
          tgtNumReviews: number | null
          tgtRevPerDay: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cram_sessions_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: true
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_derived_deck_stats: {
        Row: {
          avgInterval: number | null
          deckId: string | null
          dueReviewsRemainingBudget: number | null
          dueReviewsTotal: number | null
          lastReviewed: string | null
          newReviewsRemainingBudget: number | null
          newReviewsTotal: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_derived_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          cramState: Json | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          isCram: boolean | null
          isPublished: boolean | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          numCards: number | null
          title: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_derived_reviews: {
        Row: {
          _id: string | null
          cardId: string | null
          deckId: string | null
          dueDate: string | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          interval: number | null
          isCram: boolean | null
          isNew: boolean | null
          isSuspended: boolean | null
          numReviews: number | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_derived_reviews_due_eod: {
        Row: {
          _id: string | null
          avgInterval: number | null
          cardId: string | null
          deckId: string | null
          didx: number | null
          dueDate: string | null
          dueReviewsRemainingBudget: number | null
          dueReviewsTotal: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          interval: number | null
          isCram: boolean | null
          isNew: boolean | null
          isSuspended: boolean | null
          newReviewsRemainingBudget: number | null
          newReviewsTotal: number | null
          numReviews: number | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: []
      }
      vw_derived_reviews_due_eod_uncapped: {
        Row: {
          _id: string | null
          cardId: string | null
          deckId: string | null
          dueDate: string | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          interval: number | null
          isCram: boolean | null
          isNew: boolean | null
          isSuspended: boolean | null
          numReviews: number | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_cards: {
        Row: {
          _id: string | null
          ankiNoteId: string | null
          backlink: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          createdAt: string | null
          deckId: string | null
          editorStateBack: string | null
          editorStateFront: string | null
          isSuspended: boolean | null
          tags: string[] | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_community_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          cards: Json[] | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          numCards: number | null
          numSubscribers: number | null
          title: string | null
          userDeckRelation: string | null
          userId: string | null
          viewerId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_deck_stats: {
        Row: {
          avgInterval: number | null
          deckId: string | null
          dueReviewsDueTodayCapped: number | null
          dueReviewsTotal: number | null
          newReviewsDueTodayCapped: number | null
          newReviewsTotal: number | null
          userId: string | null
        }
        Relationships: []
      }
      vw_final_deck_tags: {
        Row: {
          deckId: string | null
          tags: string[] | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_decks: {
        Row: {
          _id: string | null
          ankiDeckId: number | null
          backlink: string | null
          cramState: Json | null
          createdAt: string | null
          deckType: Database["public"]["Enums"]["DECKTYPE"] | null
          description: string | null
          isCram: boolean | null
          isPublished: boolean | null
          maxNewPerDay: number | null
          maxReviewPerDay: number | null
          numCards: number | null
          title: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_reviews: {
        Row: {
          _id: string | null
          cardId: string | null
          deckId: string | null
          dueDate: string | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          interval: number | null
          isCram: boolean | null
          isNew: boolean | null
          isSuspended: boolean | null
          numReviews: number | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks_with_is_published_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "subscriptions_view"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_decks_filter"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_base_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_deck_stats"
            referencedColumns: ["deckId"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_derived_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_decks"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "cards_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "vw_final_subscriptions"
            referencedColumns: ["subscriptionDeckId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "cards_view"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_base_cards"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "reviews_cardId_fkey"
            columns: ["cardId"]
            isOneToOne: false
            referencedRelation: "vw_final_cards"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_reviews_due_eod: {
        Row: {
          _id: string | null
          avgInterval: number | null
          cardId: string | null
          deckId: string | null
          didx: number | null
          dueDate: string | null
          dueReviewsRemainingBudget: number | null
          dueReviewsTotal: number | null
          editorStateBack: string | null
          editorStateBackOriginal: string | null
          editorStateFront: string | null
          editorStateFrontOriginal: string | null
          interval: number | null
          isCram: boolean | null
          isNew: boolean | null
          isSuspended: boolean | null
          newReviewsRemainingBudget: number | null
          newReviewsTotal: number | null
          numReviews: number | null
          priority: number | null
          state_cram: Json | null
          state_sm2: Json | null
          tags: string[] | null
          time: number | null
          userId: string | null
        }
        Relationships: []
      }
      vw_final_revlog_summary: {
        Row: {
          count: number | null
          date: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "revlogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_secrets: {
        Row: {
          created_at: string | null
          decrypted_secret: string | null
          description: string | null
          id: string | null
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vw_final_subscriptions: {
        Row: {
          communityDeckId: string | null
          subscriptionDeckId: string | null
          userId: string | null
        }
        Insert: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Update: {
          communityDeckId?: string | null
          subscriptionDeckId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "revlog_aggregate_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_base_users"
            referencedColumns: ["_id"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_derived_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_community_decks"
            referencedColumns: ["viewerId"]
          },
          {
            foreignKeyName: "decks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "vw_final_users"
            referencedColumns: ["_id"]
          },
        ]
      }
      vw_final_users: {
        Row: {
          _id: string | null
          auth0_id: string | null
          cardType: Database["public"]["Enums"]["CARDTYPE"] | null
          firstName: string | null
          hasUsedFreeTrial: boolean | null
          isJoyrideDone: boolean | null
          lastName: string | null
          maxNewCards: number | null
          maxReviewCards: number | null
          numCardsGenerated: number | null
          numExplanationsGenerated: number | null
          numTranslationsGenerated: number | null
          showNewCardsFirst: boolean | null
          skipDays: number | null
          subscription: Database["public"]["Enums"]["SUBSCRIPTION"] | null
          subscriptionEnd: string | null
          timezone: string | null
          university: string | null
          userEmail: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      copy_deck_to_user: {
        Args: {
          source_deck_id: string
          target_user_id: unknown
        }
        Returns: string
      }
      subscribe_to_deck: {
        Args: {
          source_deck_id: string
          target_user_id: unknown
        }
        Returns: string
      }
    }
    Enums: {
      CARDTYPE: "cloze" | "frontback"
      DECKTYPE: "private" | "public" | "subscription"
      GENTYPE: "card" | "explanation" | "translation"
      SUBSCRIPTION: "free" | "pro"
      TASKNAME:
        | "import"
        | "publishDeck"
        | "unpublishCommunityDeck"
        | "subscribeToDeck"
        | "unsubscribeFromDeck"
        | "deleteDeck"
        | "deleteUser"
        | "syncDeckFromCommunity"
        | "syncCommunityFromDeck"
        | "suspendDeckCards"
        | "unsuspendDeckCards"
        | "moveDeckCards"
        | "cloneDeckContents"
        | "subscribe_deck"
      TASKSTATUS: "pending" | "inProgress" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

