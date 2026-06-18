# Priority Pilot - Design System

## 1. מבוא
מסמך זה מגדיר את השפה החזותית והרכיבים של אפליקציית Priority Pilot, במטרה להבטיח עקביות וחוויית משתמש איכותית.

## 2. צבעים (Colors)
| תפקיד | קוד צבע (Hex) | שימוש |
| :--- | :--- | :--- |
| **Primary** | `#2563EB` | כפתור ראשי, דגשים חשובים |
| **Secondary** | `#64748B` | אייקונים, טקסט משני |
| **Accent** | `#F59E0B` | רמת אנרגיה |
| **Background** | `#F8FAFC` | רקע כללי של האפליקציה |
| **Text** | `#0F172A` | כותרות וטקסט ראשי |
| **Error** | `#DC2626` | הודעות שגיאה |
| **Success** | `#16A34A` | משימות שהושלמו |

## 3. טיפוגרפיה (Typography)
| תפקיד | שם הפונט | גודל / משקל |
| :--- | :--- | :--- |
| **Heading** | Inter | 24px / Bold |
| **Body** | Inter | 16px / Regular |
| **Caption / Label** | Inter | 12px / Medium |

## 4. ריווח וצורות (Spacing & Shapes)
* **יחידת בסיס (Base Unit):** 8px
* **עיגול פינות (Border Radius):** 12px (מראה מודרני וידידותי)

## 5. סגנון רכיבים (Component Styles)
| רכיב | תיאור סגנון |
| :--- | :--- |
| **כפתורים (Buttons)** | פינות מעוגלות (12px), ללא צל, Padding של 12px-24px |
| **כרטיסים (Cards)** | רקע לבן (#FFFFFF), גבול דק באפור בהיר (#E2E8F0), פינות 12px |
| **שדות קלט (Inputs)** | גבול אפור (#CBD5E1), רקע לבן, טקסט ב-16px |
| **ניווט (Navigation)** | פס תחתון (Tab Bar) עם אייקונים דקים וצבע כחול לאייקון פעיל |
## 4. ארכיטקטורת נתונים (Database Design - ERD)
```mermaid
erDiagram
    USER {
        string id PK
        string username
        string full_name
        string profile_picture_url
        string theme_preference
        date created_at
    }

    TASK {
        string id PK
        string title
        string description
        date due_date
        string priority
        boolean is_completed
        string user_id FK
        string category_id FK
        date created_at
        date updated_at
    }

    CATEGORY {
        string id PK
        string name
        string color_code
        string user_id FK
        date created_at
    }

    PREFERENCE {
        string id PK
        string user_id FK
        string theme
        boolean notifications_enabled
        date updated_at
    }

    USER ||--o{ TASK : "creates"
    USER ||--o{ CATEGORY : "defines"
    USER ||--|| PREFERENCE : "has"
    CATEGORY ||--o{ TASK : "contains"
    ```
    