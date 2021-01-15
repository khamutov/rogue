export let cpp_tree_definition = `
template <typename T>
struct BSTNode {
  T data;
  unique_ptr<BSTNode<T>> left, right;
};
`

export let cpp_to_str = `
template <typename T>
void to_str_store_tree(vector<optional<T>> &array_repr, unique_ptr<BSTNode<T>> &tree, size_t idx) {
  if (tree == nullptr) {
    return;
  }

  if (idx >= array_repr.size()) {
    array_repr.resize(idx*2 + 1, nullopt);
  }
  array_repr[idx] = tree->data;

  to_str_store_tree(array_repr, tree->left, 2*idx + 1);
  to_str_store_tree(array_repr, tree->right, 2*idx + 2);
}

template <typename T>
string to_str(unique_ptr<BSTNode<T>> &tree) {
  vector<optional<T>> array_repr;

  to_str_store_tree(array_repr, tree, 0);

  // remove trailing nulls
  auto rit = array_repr.rbegin();
  while(!*rit) {
    rit++;
  }
  array_repr.erase(rit.base(), array_repr.end());

  stringstream ss;
  ss << array_repr.front().value();
  for (auto it = array_repr.cbegin() + 1; it != array_repr.cend(); it++) {
    ss << ",";
    if (*it) {
      ss << (*it).value();
    } else {
      ss << "null";
    }
  }

  return ss.str();
}

TEST(TreeToString, Test1) {
  unique_ptr<BSTNode<int>> node1(new BSTNode<int>{
      1,
      unique_ptr<BSTNode<int>>(new BSTNode<int>{
          2, nullptr,
          unique_ptr<BSTNode<int>>(new BSTNode<int>{3, nullptr, nullptr})}),
      unique_ptr<BSTNode<int>>(new BSTNode<int>{
          7, unique_ptr<BSTNode<int>>(new BSTNode<int>{6, nullptr, nullptr}),
          unique_ptr<BSTNode<int>>(new BSTNode<int>{8, nullptr, nullptr})})});

  EXPECT_EQ(to_str(node1), "1,2,7,null,3,6,8");
}
`;

export let cpp_from_str = `
template <typename T>
void build_node(size_t idx, BSTNode<T> *node, vector<optional<T>> arr) {
  size_t left_idx = 2 * idx + 1;
  if (left_idx < arr.size()) {
    if (arr[left_idx]) {
      node->left = unique_ptr<BSTNode<T>>(new BSTNode<T> {
          arr[left_idx].value(),
          nullptr,
          nullptr
        });
      build_node(left_idx, node->left.get(), arr);
    }
  }
  size_t right_idx = 2 * idx + 2;
  if (right_idx < arr.size()) {
    if (arr[right_idx]) {
      node->right = unique_ptr<BSTNode<T>>(new BSTNode<T>{
          arr[right_idx].value(),
          nullptr,
          nullptr});
      build_node(right_idx, node->right.get(), arr);
    }
  }
}

template <typename T>
unique_ptr<BSTNode<T>> parse_array(vector<optional<T>> arr) {
  unique_ptr<BSTNode<T>> tree = unique_ptr<BSTNode<T>>(new BSTNode<T> {
      arr.front().value(),
      nullptr,
      nullptr
    });
  build_node(0, tree.get(), arr);

  return tree;
}

unique_ptr<BSTNode<int>> from_str(string str) {
  stringstream ss(str);
  string item;

  vector<optional<int>> arr;

  while(getline(ss, item, ',')) {
    if (item == "null") {
      arr.push_back(nullopt);
    } else {
      arr.push_back(stoi(item));
    }
  }

  return parse_array(arr);
}

unique_ptr<BSTNode<int>> tree = from_str("1,2,7,null,3,6,8");
`