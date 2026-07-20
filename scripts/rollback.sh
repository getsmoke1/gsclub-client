#!/bin/bash
# GetSmoke Vercel Rollback Script
# Usage: bash scripts/rollback.sh [deployment_id]
# Example: bash scripts/rollback.sh dpl_AALyfTakUvznVZPJXZChXY8j4FY1
# Without argument: shows last 8 deployments to pick from

# Credentials stored on VPS at /data/.openclaw/workspace/.deploy-secrets (not committed)
VERCEL_TOKEN="${VERCEL_TOKEN:-$(grep VERCEL_TOKEN /data/.openclaw/workspace/.deploy-secrets 2>/dev/null | cut -d= -f2)}"
TEAM="${VERCEL_TEAM:-team_xq8gks9ZvGGNpq7jzt1YZ1Sq}"
PROJECT_ID="${VERCEL_PROJECT:-prj_3HnROPuqqeOOWpdH9KbseHbYCoex}"
DOMAIN="getsmoke.com"

if [ -z "$1" ]; then
    echo "=== Recent READY deployments ==="
    curl -s "https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM}&limit=8&state=READY" \
      -H "Authorization: Bearer $VERCEL_TOKEN" | python3 -c "
import sys,json
from datetime import datetime
d=json.load(sys.stdin)
for i,dep in enumerate(d.get('deployments',[])):
    ts = datetime.fromtimestamp(dep.get('created',0)/1000).strftime('%Y-%m-%d %H:%M')
    uid = dep.get('uid','?')
    msg = dep.get('meta',{}).get('githubCommitMessage','manual')[:55]
    mark = ' ← CURRENT' if i==0 else ''
    print(f'  [{i+1}] {uid}{mark}')
    print(f'       {ts} | {msg}')
    print()
"
    echo "Run: bash scripts/rollback.sh <deployment_id>"
    exit 0
fi

DEPLOY_ID="$1"
echo "Rolling back getsmoke.com → $DEPLOY_ID ..."

# Re-assign production alias to the target deployment
RESULT=$(curl -s -X POST "https://api.vercel.com/v2/deployments/${DEPLOY_ID}/aliases?teamId=${TEAM}" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"alias\": \"${DOMAIN}\"}")

echo "$RESULT" | python3 -c "
import sys,json
d=json.load(sys.stdin)
if 'alias' in d or d.get('uid'):
    print('✅ Rollback complete: getsmoke.com now points to $1')
else:
    print('❌ Error:', d.get('error',{}).get('message', str(d)))
"
