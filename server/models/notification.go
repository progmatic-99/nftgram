package models

type Notification struct {
	Owner    string `json:"owner"`
	User     string `json:"user"`
	PostName string `json:"post_name"`
	Img      string `json:"img_link"`
	Opensea  string `json:"opensea_link"`
}
