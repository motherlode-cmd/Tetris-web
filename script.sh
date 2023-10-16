'' > a.txt 
for(( i=1; i <= 6; i++ ))
do
    mpic++ PA_lab1.cpp  -o main && mpiexec -n $i ./main >> a.txt
done
gnuplot graph.plot