#!/bin/bash

# Load configuration from .env file
source ~/ai-playground/.env

# Ensure backup directories exist
mkdir -p "$DB_BACKUP_DIR/daily"
mkdir -p "$DB_BACKUP_DIR/monthly"

# Configuration
MAX_DAYS=7
MAX_MONTHS=3

# Function to delete old backups
cleanup_backups() {
    find $1 -mtime +$2 -type f -name '*.sql' -exec rm {} \;
}

# Date variables
DATE=$(date +%Y%m%d_%H%M%S)
DAY_OF_MONTH=$(date +%d)
LAST_DAY_OF_MONTH=$(date -d "$(date +%Y-%m-01) +1 month -1 day" +%d)

# Daily backup
mysqldump -u $DB_USR -p$DB_PWD $DB_NAME > $DB_BACKUP_DIR/daily/db_backup_$DATE.sql

# Cleanup old daily backups
cleanup_backups "$DB_BACKUP_DIR/daily" $MAX_DAYS

# Monthly backup on the last day of the month
if [ "$DAY_OF_MONTH" -eq "$LAST_DAY_OF_MONTH" ]; then
    cp $DB_BACKUP_DIR/daily/db_backup_$DATE.sql $DB_BACKUP_DIR/monthly/db_backup_month_$DATE.sql

    # Cleanup old monthly backups
    cleanup_backups "$DB_BACKUP_DIR/monthly" $(($MAX_MONTHS * 30)) # Approximation of months in days
fi
