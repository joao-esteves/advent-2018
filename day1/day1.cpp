#include <iostream>
#include <fstream>
#include <string>
#include <set>

using namespace std;

int readFinalFreq(const string &filename) {
    int counter = 0, temp;
    ifstream in(filename);
    while (in >> temp) {
        counter += temp;
    }
    in.close();
    return counter;
}

bool freqAlreadyReached(int freq, const set<int> &freqsReached) {
    return freqsReached.find(freq) != freqsReached.end();
}

int readFirstFreqReachedTwice(const string &filename) {
    int counter = 0, temp, res;
    bool solutionFound = false;
    set<int> freqsReached;
    while (!solutionFound) {
        ifstream in(filename);
        while (in >> temp) {
            counter += temp;
            if (freqAlreadyReached(counter, freqsReached)) {
                res = counter;
                solutionFound = true;
                break;
            }
            freqsReached.insert(counter);
        }
        in.close();
    }
    
    return res;
}

/**
 * Reads file multiple times, mainly on the second part.
 * Theoretically I could have read it once and stored
 * the results in memory, but ain't no one got time for that.
 */
int main() {
    int finalFreq = readFinalFreq("input.txt");
    cout << "First part: " << finalFreq << "\n";
    int freqTwice = readFirstFreqReachedTwice("input.txt");
    cout << "Second part: " << freqTwice << "\n";

}