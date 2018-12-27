#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int readFrequencies(string filename) {
    int counter = 0, temp;
    ifstream in(filename);
    while (in >> temp) {
        counter += temp;
    }
    in.close();
    return counter;
}

int main() {
    int counter = readFrequencies("input.txt");
    cout << counter << "\n";
}