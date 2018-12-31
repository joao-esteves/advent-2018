#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <set>
#include <algorithm> // sort, set_intersection

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

class NoSimilarStringException : public exception {

};

unsigned matchingCharacters(const string &s1, const string &s2) {
  unsigned counter = 0;
  for (size_t i = 0; i < s1.size(); i++) {
    if (s1.at(i) == s2.at(i)) {
      counter++;
    }
  }
  return counter;
}

// Box IDs are similar if they're equal in all characters except one.
bool areSimilar(const string &s1, const string &s2) {
  return
    s1.size() == s2.size()
    && s1.size() == matchingCharacters(s1, s2) + 1;
}

string getSimilarBoxId(const set<string> &boxIds, const string &boxId) {
  for (auto it = boxIds.begin(); it != boxIds.end(); it++) {
    if (areSimilar(*it, boxId)) {
      return *it;
    }
  }
  throw NoSimilarStringException();
}

string getCommonChars(const string &s1, const string &s2) {
  string res;
  for (size_t i = 0; i < s1.size(); i++) {
    if (s1.at(i) == s2.at(i)) {
      res.push_back(s1.at(i));
    }
  }
  return res;
}

string readCommonCharacters(const string &filename) {
  string boxId, commonChars;
  set<string> boxIds;
  ifstream in(filename);
  while (in >> boxId) {
    try {
      string similarBoxId = getSimilarBoxId(boxIds, boxId);
      commonChars = getCommonChars(boxId, similarBoxId);
      break;
    } catch (NoSimilarStringException &e) {}
    boxIds.insert(boxId);
  }
  in.close();
  return commonChars;
}

int main() {
  int checksum = readChecksum("input.txt");
  cout << "Checksum: " << checksum << "\n";
  string common = readCommonCharacters("input.txt");
  cout << "Common characters: " << common << "\n";
}