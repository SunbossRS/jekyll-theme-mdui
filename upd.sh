dt=$(date -d '' "+%Y-%m-%d")
tm=$(date "+%H:%M:%S")
git pull & git add .  
git commit -a -m "Release "$dt" "$tm
git push
