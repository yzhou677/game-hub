# RAWG Top Games Sync Script

This directory contains a standalone Python ETL script used to fetch
a curated set of top games from the RAWG API and store them in Firestore.

The resulting dataset serves as the recommendation candidate pool for the GameHub application.
It can be refreshed manually or automated via Cloud Scheduler.

---

## 🔧 Setup

Install Python dependencies:

```bash
pip install -r requirements.txt