import "@styles/globals.css";
import Nav from "../components/Nav";
import Provider from "../components/Provider";
import Feed from "../components/Feed";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        <Feed />
      </Provider>
    </body>
  </html>
);

export default RootLayout;
