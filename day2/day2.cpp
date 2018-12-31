#include <iostream>
#include <fstream>
#include <string>
#include <map>

using namespace std;

bool wordHasNLettersRepeated(const string &word, int numLetters) {
  map<char, int> letterFrequency;
  for (const char &c: word) {
    letterFrequency[c]++;
  }
  for (auto it = letterFrequency.begin(); it != letterFrequency.end(); it++) {
    if (it->second == numLetters) {
      return true;
    }
  }
  return false;
}

int readChecksum(const string &filename) {
  int words2 = 0, words3 = 0;
  string word;
  ifstream in(filename);
  while (in >> word) {
    if (wordHasNLettersRepeated(word, 2)) {
      words2++;
    }
    if (wordHasNLettersRepeated(word, 3)) {
      words3++;
    }
  }
  in.close();
  int checksum = words2 * words3;
  return checksum;
}

int main() {
  int checksum = readChecksum("input.txt");
  cout << "Checksum: " << checksum << "\n";
}